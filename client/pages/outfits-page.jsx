import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';
import { Spinner } from 'reactstrap';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class OutfitsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfits: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const userId = this.context.user.userId;
    const token = this.context.token;
    fetch(`/api/outfits/${userId}`, {
      headers: {
        'x-access-token': token
      }
    })
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
        <Spinner className="mt-5 mx-auto"></Spinner>
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
            <Outfit key={outfit[0].outfitId} outfitArticles={outfit}outfitNum={index} />
          );
        })
      );
    }
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <>
        <Navbar pageHeader='Outfits' />
        <AppDrawer />
        <div className="row d-flex justify-content-center">
         { this.renderPage()}
        </div>
      </>
    );
  }
}

OutfitsPage.contextType = AppContext;
