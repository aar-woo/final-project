import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Inventory from '../components/inventory';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class InventoryPage extends React.Component {

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
        <Navbar pageHeader='Inventory' />
        <AppDrawer />
        <Inventory />
      </>
    );
  }

}

InventoryPage.contextType = AppContext;
