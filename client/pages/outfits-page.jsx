import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';

export default class OutfitsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfits: [
        [
          {
            articleTypeId: 1,
            imgUrl: '/images/image-1636593985615.JPEG',
            outfitId: 2,
            primaryColor: 'rgb(162, 35, 74)',
            secondaryColor: 'none'
          },
          {
            articleTypeId: 3,
            imgUrl: '/images/image-1636658964531.JPEG',
            outfitId: 2,
            primaryColor: 'white',
            secondaryColor: 'grey'
          },
          {
            articleTypeId: 2,
            imgUrl: '/images/image-1636593966287.JPEG',
            outfitId: 2,
            primaryColor: 'rgb(25, 24, 32)',
            secondaryColor: 'none'
          }
        ]
      ]
    };
  }

  render() {
    const outfits = this.state.outfits;
    return (
      <>
        <Navbar pageHeader='Inventory' />
        <AppDrawer />
        <div className="row d-flex">
          {
            outfits.map(outfit => {
              return (
                <Outfit key={outfit[0].outfitId} outfitArticles={outfit} />
              );
            })
          }
          {/* <Outfit outfitArticles={this.state.outfits[0]} /> */}
        </div>
      </>
    );
  }

}
