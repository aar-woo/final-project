import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import ArticleOptions from '../components/article-options';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class PickerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topArticleId: null,
      bottomArticleId: null,
      shoesArticleId: null,
      outfitOptionKey: 0
    };
    this.handleCurrentArticle = this.handleCurrentArticle.bind(this);
    this.addOutfit = this.addOutfit.bind(this);
  }

  handleCurrentArticle(currentArticle) {
    const articleTypeId = currentArticle.articleTypeId;
    const articleId = currentArticle.articleId;
    if (articleTypeId === 1) {
      this.setState({
        topArticleId: articleId
      });
    } else if (articleTypeId === 2) {
      this.setState({
        bottomArticleId: articleId
      });
    } else if (articleTypeId === 3) {
      this.setState({
        shoesArticleId: articleId
      });
    }
  }

  addOutfit() {
    const token = this.context.token;
    fetch('/api/outfits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          topArticleId: null,
          bottomArticleId: null,
          shoesArticleId: null,
          outfitOptionKey: this.state.outfitOptionKey + 1
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    let addBtnClass;
    if (this.state.topArticleId && this.state.bottomArticleId && this.state.shoesArticleId) {
      addBtnClass = 'btn btn-primary mt-3 shadow';
    } else {
      addBtnClass = 'btn btn-primary mt-3 disabled';
    }
    return (
      <>
        <Navbar pageHeader='Outfit Picker' />
        <AppDrawer />
        <div className="container mt-4">
          <OutfitOption key={this.state.outfitOptionKey} handleCurrentArticle={this.handleCurrentArticle}/>
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-center">
              <button className={addBtnClass} onClick={this.addOutfit}>Add to Outfits</button>
            </div>
          </div>
        </div>
      </>
    );
  }
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

PickerPage.contextType = AppContext;
