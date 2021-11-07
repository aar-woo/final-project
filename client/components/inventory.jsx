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
    <div className="container">

      <div className="row d-flex justify-content-center">
        {
          this.state.articles.map(article => (
            <Article articleInfo={article} key={article.articleId}/>

          ))
        }
        <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
        <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
        <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />
        <Article articleInfo={{ imgUrl: 'images/hoodiePlaceholder.png' }} />

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
            <img src={imgUrl} className="img-thumbnail border-2 border-dark" />
          </div>
        </div>
        <div className="row d-flex align-self-start ms-md-3 ms-lg-4 ms-xl-5">
        <div className="col-12 ps-lg-1 ps-xl-4">
            <a><div className="primary-square d-inline-block me-2" style={{ backgroundColor: `${primaryColor}` }}></div></a>
            <a><div className="secondary-square mt-3 d-inline-block" style={{ backgroundColor: `${secondaryColor}` }} ></div></a>
          </div>
        </div>
      </div>
  );
}
