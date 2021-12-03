import React from 'react';
import AppContext from '../lib/app-context';
import { Spinner } from 'reactstrap';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articleType: 'articles',
      isLoading: true,
      networkError: false
    };
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const userId = this.context.user.userId;
    const token = this.context.token;
    try {
      const response = await fetch(`/api/inventory/${userId}`, {
        headers: {
          'x-access-token': token
        }
      });
      const articles = await response.json();
      this.setState({
        articles,
        isLoading: false
      });
    } catch (err) {
      console.error(err);
      this.setState({
        isLoading: false,
        networkError: true
      });
    }
  }

  async handleTypeSelect(event) {
    const articleType = event.target.value;
    const userId = this.context.user.userId;
    const token = this.context.token;
    let url;
    articleType === 'articles' ? url = '' : url = articleType;
    try {
      const response = await fetch(`/api/inventory/${userId}/${url}`, {
        headers: {
          'x-access-token': token
        }
      });
      const articles = await response.json();
      this.setState({
        articles,
        articleType
      });
    } catch (err) {
      console.error(err);
    }
  }

  async handleDelete(event) {
    const articleId = parseInt(event.target.getAttribute('datakey'));
    const token = this.context.token;
    let articleIndex;
    for (let i = 0; i < this.state.articles.length; i++) {
      if (this.state.articles[i].articleId === articleId) {
        articleIndex = i;
      }
    }
    try {
      await fetch(`/api/inventory/${articleId}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token
        }
      });
      const articlesCopy = this.state.articles.slice();
      articlesCopy.splice(articleIndex, 1);
      this.setState({ articles: articlesCopy });
    } catch (err) {
      console.error(err);
    }
  }

  renderPage() {
    if (this.state.isLoading) {
      return (
        <Spinner className="mt-5 mx-auto"></Spinner>
      );
    }
    if (this.state.networkError) {
      return (
        <h4 className="mt-5 text-center">Sorry, there was an error connecting to the network!</h4>
      );
    }
    if (this.state.articles.length === 0) {
      let placeholderType;
      if (this.state.articleType === 'articles') {
        placeholderType = 'hoodie';
      } else {
        placeholderType = this.state.articleType;
      }
      return (
        <NoArticles articleType={this.state.articleType} placeholderType={`images/${placeholderType}Placeholder.png`}/>
      );
    } else {
      return (
        <Articles inventoryState={this.state} handleTypeSelect={this.handleTypeSelect} handleDelete={this.handleDelete}/>
      );
    }
  }

  render() {
    let emptyHeader = 'd-none';
    if (this.state.articles.length === 0 && !this.state.isLoading && !this.state.networkError) {
      emptyHeader = 'col-12 col-md-6 d-flex align-items-end justify-content-end mt-3';
    }
    return (
      <>
        <div className="container">
          <div className="row mx-md-3 mx-lg-4 mx-xl-5">
            <div className="col-12 col-md-6 ps-lg-1 ps-xxl-4">
              <select className="form-select mt-4" onChange={this.handleTypeSelect}>
                <option value='articles'>Article Type</option>
                <option value="articles">All articles</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>
            <NoArticlesHeader classes={emptyHeader} articleType={this.state.articleType} />
          </div>
          <div className="row">
            {this.renderPage()}
          </div>
        </div>
      </>
    );
  }
}

function Article(props) {
  const { articleId, imgUrl, primaryColor, secondaryColor, isPlaceholder } = props.articleInfo;
  let deleteBtnClass = 'col-6 d-flex align-items-center justify-content-end';
  if (isPlaceholder) {
    deleteBtnClass = 'd-none';
  }
  return (
    <div className="col-6 col-md-4 col-lg-3 mt-4 inventory-article">
      <div className="row">
        <div className="col-12 d-flex flex-wrap justify-content-center">
          <div className="col-12 d-flex justify-content-center p-0">
            <img src={imgUrl} className="border border-2 border-dark shadow" />
          </div>
          <div className="col-12 inventory-squares-col d-flex justify-content-between">
            <div className="col-6">
              <a><div className="primary-square d-inline-block me-2 shadow-sm" style={{ backgroundColor: `${primaryColor}` }}></div></a>
              <a><div className="secondary-square mt-3 d-inline-block shadow-sm" style={{ backgroundColor: `${secondaryColor}` }} ></div></a>
            </div>
            <div className={deleteBtnClass}>
              <button datakey={articleId} className="btn btn-danger btn-sm shadow-sm" onClick={props.onClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Articles(props) {
  const { articles } = props.inventoryState;
  return (
    <>
      {
        articles.map(article => (
          <Article articleInfo={article} key={article.articleId} onClick={props.handleDelete}/>
        ))
      }
    </>
  );
}

function NoArticles(props) {
  const articleType = props.articleType;
  const imgUrl = props.placeholderType;
  const emptyArticles = [];
  for (let i = 0; i < 8; i++) {
    emptyArticles.push('placeholder');
  }
  return (
  <>
    {
      emptyArticles.map((placeholderArticle, index) => (
        <Article articleInfo={{ imgUrl, articleType, isPlaceholder: true }} key={index} />
      ))
    }
  </>
  );
}

function NoArticlesHeader(props) {
  return (
    <div className={props.classes}>
      <h4 className="mb-0">No {props.articleType} in your inventory.</h4>
    </div>
  );
}

Inventory.contextType = AppContext;
