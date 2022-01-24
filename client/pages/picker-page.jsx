import React, { useContext, useState } from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import ArticleOptions from '../components/article-options';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function PickerPage(props) {
  const [topId, setTopId] = useState(null);
  const [bottomId, setBottomId] = useState(null);
  const [shoesId, setShoesId] = useState(null);
  const [outfitKey, setOutfitKey] = useState(0);
  const { user } = useContext(AppContext);
  const { token } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  let addBtnClass;
  if (topId && bottomId && shoesId) {
    addBtnClass = 'btn btn-primary mt-3 shadow';
  } else {
    addBtnClass = 'btn btn-primary mt-3 disabled';
  }

  function handleCurrentArticle(currentArticle) {
    const articleTypeId = currentArticle.articleTypeId;
    const articleId = currentArticle.articleId;
    if (articleTypeId === 1) {
      setTopId(articleId);
    } else if (articleTypeId === 2) {
      setBottomId(articleId);
    } else if (articleTypeId === 3) {
      setShoesId(articleId);
    }
  }

  async function addOutfit() {
    try {
      const outfitIds = {
        topArticleId: topId,
        bottomArticleId: bottomId,
        shoesArticleId: shoesId
      };
      const response = await fetch('/api/outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(outfitIds)
      });
      await response.json();
      setTopId(null);
      setBottomId(null);
      setShoesId(null);
      setOutfitKey(prevOutfitKey => outfitKey + 1);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar pageHeader='Outfit Picker' />
      <AppDrawer />
      <div className="container mt-4">
        <OutfitOption key={outfitKey} handleCurrentArticle={handleCurrentArticle} />
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-center">
            <button className={addBtnClass} onClick={addOutfit}>Add to Outfits</button>
          </div>
        </div>
      </div>
    </>
  );
}

function OutfitOption(props) {
  return (
    <>
      <ArticleOptions articleType='tops' getArticle={props.handleCurrentArticle}/>
      <ArticleOptions articleType='bottoms' getArticle={props.handleCurrentArticle} />
      <ArticleOptions articleType='shoes' getArticle={props.handleCurrentArticle} />
    </>
  );
}
