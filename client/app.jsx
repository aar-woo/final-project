import React from 'react';
import parseRoute from './lib/parse-route';
import InventoryPage from './pages/inventory-page';
import UploadPage from './pages/upload-page';
import PickerPage from './pages/picker-page';
import OutfitsPage from './pages/outfits-page';
import AuthPage from './pages/auth-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <AuthPage />;
    }
    if (route.path === 'upload') {
      return <UploadPage />;
    }
    if (route.path === 'inventory') {
      return <InventoryPage />;
    }
    if (route.path === 'picker') {
      return <PickerPage />;
    }
    if (route.path === 'outfits') {
      return <OutfitsPage />;
    }
  }

  render() {
    return (
    <>
      {this.renderPage()}
    </>
    );
  }
}
