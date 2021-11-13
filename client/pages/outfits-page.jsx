import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';
import { Spinner } from 'reactstrap';

export default class OutfitsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfits: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/outfits/1')
      .then(res => res.json())
      .then(outfits => {
        this.setState({
          outfits,
          isLoading: false
        });
      })
      .catch(err => console.error(err));
  }

  renderPage() {
    const outfits = this.state.outfits;
    if (this.state.isLoading) {
      return (
        <div className="col-12 mt-5 d-flex justify-content-center">
          <Spinner></Spinner>
        </div>
      );
    }
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
