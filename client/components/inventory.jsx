import React from 'react';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  componentDidMount() {
    fetch('/api/inventory/1')
      .then(res => res.json())
      .then(articles => this.setState({ articles }))
      .catch(err => console.error(err));
  }

  render() {
    const articles = this.state.articles;
    const numPlaceholders = [];
    if (articles.length % 2 === 0) {
      for (let i = 0; i < 8; i++) {
        numPlaceholders.push('placeholder');
      }
    } else {
      for (let i = 0; i < 7; i++) {
        numPlaceholders.push('placeholder');
      }
    }
    return (
    <div className="container">
      <div className="row d-flex">
        {
          this.state.articles.map(article => (
            <Article articleInfo={article} key={article.articleId}/>
          ))
        }
        {
          numPlaceholders.map((placeholderArticle, index) => (
            <Article key={ index } articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
          ))
        }
      </div>
    </div>
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
