import React from 'react';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  componentDidMount() {
    fetch('/api/inventory/1')
      .then(res => res.json())
      .then(articles => this.setState({ articles }));
  }

  render() {
    return (
    <div className="row d-flex justify-content-center">
      {
        this.state.articles.map(article => (
          <Article articleInfo={article} key={article.articleId}/>

        ))
      }
      <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
      <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
      <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />

    </div>
    );
  }
}

function Article(props) {
  const { imgUrl, primaryColor, secondaryColor } = props.articleInfo;
  return (
      <div className="col-5 col-md-3 col-lg-2 m-2 mt-4 inventory-article">
        <img src={imgUrl} className="img-thumbnail border-2 border-dark" />
        <div className="row">
          <div className="col-12">
          <a><div className="primary-square d-inline-block me-2" style={{ backgroundColor: `${primaryColor}` }}></div></a>
          <a><div className="secondary-square mt-3 d-inline-block" style={{ backgroundColor: `${secondaryColor}` }} ></div></a>
          </div>
        </div>

      </div>
  );
}
