import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Inventory from '../components/inventory';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function InventoryPage(props) {
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  return (
    <>
      <Navbar pageHeader='Inventory' />
      <AppDrawer />
      <Inventory />
    </>
  );
}
