import React, { useEffect, useState } from 'react';
import parseRoute from './lib/parse-route';
import InventoryPage from './pages/inventory-page';
import UploadPage from './pages/upload-page';
import PickerPage from './pages/picker-page';
import OutfitsPage from './pages/outfits-page';
import AuthPage from './pages/auth-page';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';

export default function App(props) {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      setRoute(newRoute);
    });
    const token = window.localStorage.getItem('jwt');
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('jwt');
    setUser(null);
  }

  if (isAuthorizing) return null;

  const token = window.localStorage.getItem('jwt');
  const contextValue = { user, route, handleSignIn, handleSignOut, token };
  let page;

  if (route.path === 'sign-in' || route.path === 'sign-up') {
    page = <AuthPage />;
  }
  if (route.path === 'upload') {
    page = <UploadPage />;
  }
  if (route.path === 'inventory') {
    page = <InventoryPage />;
  }
  if (route.path === '') {
    page = <PickerPage />;
  }
  if (route.path === 'outfits') {
    page = <OutfitsPage />;
  }

  return (
    <>
      <AppContext.Provider value={contextValue}>
        {page}
      </AppContext.Provider>
    </>
  );
}
