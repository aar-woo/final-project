import React from 'react';
import parseRoute from './lib/parse-route';
import InventoryPage from './pages/inventory-page';
import UploadPage from './pages/upload-page';

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
      return <UploadPage />;
    }
    if (route.path === 'inventory') {
      return <InventoryPage />;
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

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       view: 'Inventory'
//     }
//   }

//   changeView() {
//     this.state.view = {}
//   }

//   render() {
//     return (
//       <>
//         <AppContext.Provider value={contextValue} />
//         <InventoryPage />
//         <AppContext />
//       </>
//     );
//     // return <UploadPage />;

//   }
// }
