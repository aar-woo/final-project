import React from 'react';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articleType: 'articles'
    };
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
  }

  componentDidMount() {
    fetch('/api/inventory/1')
      .then(res => res.json())
      .then(articles => this.setState({ articles }))
      .catch(err => console.error(err));
  }

  handleTypeSelect(event) {
    const articleType = event.target.value;
    let url;
    articleType === 'articles' ? url = '' : url = articleType;
    fetch(`/api/inventory/1/${url}`)
      .then(res => res.json())
      .then(articles => this.setState({
        articles,
        articleType
      }))
      .catch(err => console.error(err));
  }

  renderPage() {
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
        <Articles inventoryState={this.state} handleTypeSelect={this.handleTypeSelect}/>
      );
    }
  }

  render() {
    let emptyHeader = 'd-none';
    if (this.state.articles.length === 0) {
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
  const { imgUrl, primaryColor, secondaryColor } = props.articleInfo;
  return (
    <div className="col-5 col-md-4 col-lg-3 m-1 mt-4 inventory-article m-auto d-flex flex-column align-items-center">
      <div className="row">
        <div className="col-12">
          <img src={imgUrl} className="border border-2 border-dark shadow" />
        </div>
      </div>
      <div className="row d-flex align-self-start ms-sm-3 ms-md-4 ms-lg-4 ms-xl-5">
        <div className="col-12 ps-0 ps-sm-1 ps-lg-1 ps-xxl-4">
          <a><div className="primary-square d-inline-block me-2 shadow-sm" style={{ backgroundColor: `${primaryColor}` }}></div></a>
          <a><div className="secondary-square mt-3 d-inline-block shadow-sm" style={{ backgroundColor: `${secondaryColor}` }} ></div></a>
        </div>
      </div>
    </div>
  );
}

function Articles(props) {
  const { articles, articleType } = props.inventoryState;
  const numPlaceholders = [];
  let placeholderType;
  if (articleType === 'articles') {
    placeholderType = 'hoodie';
  } else {
    placeholderType = articleType;
  }
  if (articles.length % 2 === 0) {
    for (let i = 0; i < 2; i++) {
      numPlaceholders.push('placeholder');
    }
  } else {
    for (let i = 0; i < 1; i++) {
      numPlaceholders.push('placeholder');
    }
  }
  return (
    <>
      {
        articles.map(article => (
          <Article articleInfo={article} key={article.articleId} />
        ))
      }
      {
        numPlaceholders.map((placeholderArticle, index) => (
          <Article articleInfo={{ imgUrl: `images/${placeholderType}Placeholder.png` }} key={index} />
        ))
      }
    </>
  );
}

function NoArticles(props) {
  const articleType = props.articleType;
  const imgUrl = props.placeholderType;
  const emptyArticles = [];
  for (let i = 0; i < 12; i++) {
    emptyArticles.push('placeholder');
  }
  return (
  <>
    {
      emptyArticles.map((placeholderArticle, index) => (
        <Article articleInfo={{ imgUrl, articleType }} key={index} />
      ))
    }
  </>
  );
}

function NoArticlesHeader(props) {
  return (
    <div className={props.classes}>
      <h4>No {props.articleType} in your inventory.</h4>
    </div>
  );
}
