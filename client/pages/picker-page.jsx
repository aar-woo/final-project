import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import ArticleOptions from '../components/article-options';

export default function PickerPage(props) {
  return (
    <>
      <Navbar pageHeader='Outfit Picker' />
      <AppDrawer />
      <ArticleOptions articleType='tops'/>
      <ArticleOptions articleType='bottoms'/>
      <ArticleOptions articleType='shoes'/>
    </>
  );
}
