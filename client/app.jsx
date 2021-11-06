import React from 'react';
import Inventory from './components/inventory';
import Navbar from './components/navbar';
// import UploadPage from './pages/upload-page';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Inventory />
      </>
    );
    // return <UploadPage />;

  }
}
