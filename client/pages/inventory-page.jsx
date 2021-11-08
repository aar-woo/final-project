import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Inventory from '../components/inventory';

export default function InventoryPage(props) {
  return (
    <>
      <Navbar pageHeader='Inventory' />
      <AppDrawer />
      <Inventory />
    </>
  );
}
