import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import Outfit from '../components/outfit';
import { Spinner } from 'reactstrap';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function OutfitsPage(props) {
  const [outfits, setOutfits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const { user } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const userId = user.userId;

  useEffect(async () => {
    try {
      const response = await fetch(`/api/outfits/${userId}`, {
        headers: {
          'x-access-token': token
        }
      });
      const outfits = await response.json();
      const outfitsArr = [];
      let currOutfit = [];
      for (let i = 0; i < outfits.length; i++) {
        currOutfit.push(outfits[i]);
        if (currOutfit.length === 3) {
          outfitsArr.push(currOutfit);
          currOutfit = [];
        }
      }
      setOutfits(outfitsArr);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setNetworkError(true);
    }
  }, []);

  let page;

  if (isLoading) {
    page = <Spinner className="mt-5 mx-auto"></Spinner>;
  } else if (networkError) {
    page = <h4 className="mt-5 text-center">Sorry, there was an error connecting to the network!</h4>;
  } else if (outfits.length === 0) {
    page = <h3 className="text-center mt-5">No outfits saved):</h3>;
  } else {
    page = outfits.map((outfit, index) => {
      return (
        <Outfit key={outfit[0].outfitId} outfitArticles={outfit} outfitNum={index} />
      );
    });
  }

  if (!user) return <Redirect to="sign-in" />;

  return (
    <>
      <Navbar pageHeader='Outfits' />
      <AppDrawer />
      <div className="row d-flex justify-content-center">
        {page}
      </div>
    </>
  );
}
