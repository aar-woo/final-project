import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';

export default class OutfitsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfits: []
    };
  }

  componentDidMount() {
    fetch('/api/outfits/1')
      .then(res => res.json())
      .then(outfits => {
        this.setState({
          outfits
        });
      })
      .catch(err => console.error(err));
  }

  renderPage() {
    const outfits = this.state.outfits;
    if (this.state.outfits.length === 0) {
      return (
        <h3 className="text-center mt-5">No outfits saved):</h3>
      );
    } else {
      return (

        outfits.map((outfit, index) => {
          return (
            <Outfit key={outfit[0].outfitId} outfitArticles={outfit} outfitNum={index} />
          );
        })

      );
    }
  }

  render() {
    return (
      <>
        <Navbar pageHeader='Inventory' />
        <AppDrawer />
        <div className="row d-flex justify-content-center">
         { this.renderPage()}
        </div>
      </>
    );
  }

}
