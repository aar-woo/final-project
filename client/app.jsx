import React from 'react';
import parseRoute from './lib/parse-route';
import InventoryPage from './pages/inventory-page';
import UploadPage from './pages/upload-page';
import PickerPage from './pages/picker-page';
import OutfitsPage from './pages/outfits-page';
import AuthPage from './pages/auth-page';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
    const token = window.localStorage.getItem('jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <AuthPage />;
    }
    if (route.path === 'upload') {
      return <UploadPage />;
    }
    if (route.path === 'inventory') {
      return <InventoryPage />;
    }
    if (route.path === '') {
      return <PickerPage />;
    }
    if (route.path === 'outfits') {
      return <OutfitsPage />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const token = window.localStorage.getItem('jwt');
    const contextValue = { user, route, handleSignIn, handleSignOut, token };

    return (
    <>
    <AppContext.Provider value={contextValue}>
      {this.renderPage()}
    </AppContext.Provider>
    </>
    );
  }
}
