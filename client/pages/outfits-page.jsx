import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';

export default function OutfitsPage(props) {
  return (
    <>
      <Navbar pageHeader='Inventory' />
      <AppDrawer />
      <Outfit />
    </>
  );
}
