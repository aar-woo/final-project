import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../lib/app-context';
import { Spinner } from 'reactstrap';

export default function Inventory(props) {
  const [articles, setArticles] = useState([]);
  const [articleType, setArticletype] = useState('articles');
  const [isLoading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const { user } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const userId = user.userId;

  useEffect(async () => {
    try {
      const response = await fetch(`/api/inventory/${userId}`, {
        headers: {
          'x-access-token': token
        }
      });
      const articles = await response.json();
      setArticles(articles);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useEffect(async () => {
    let url;
    articleType === 'articles' ? url = '' : url = articleType;
    try {
      const response = await fetch(`/api/inventory/${userId}/${url}`, {
        headers: {
          'x-access-token': token
        }
      });
      const articles = await response.json();
      setArticles(articles);
    } catch (err) {
      console.error(err);
    }
  }, [articleType]);

  let emptyHeader = 'd-none';
  if (articles.length === 0 && !isLoading && !networkError) {
    emptyHeader = 'col-12 col-md-6 d-flex align-items-end justify-content-end mt-3';
  }

  let page;
  if (isLoading) {
    page = <Spinner className="mt-5 mx-auto"></Spinner>;
  }
  if (networkError) {
    page = <h4 className="mt-5 text-center">Sorry, there was an error connecting to the network!</h4>;
  }
  if (articles.length === 0) {
    let placeholderType;
    if (articleType === 'articles') {
      placeholderType = 'hoodie';
    } else {
      placeholderType = articleType;
    }
    page = <NoArticles articleType={articleType} placeholderType={`images/${placeholderType}Placeholder.png`} />;
  } else {
    page = <Articles articlesArray={articles} />;
  }

  return (
    <>
      <div className="container">
        <div className="row mx-md-3 mx-lg-4 mx-xl-5">
          <div className="col-12 col-md-6 ps-lg-1 ps-xxl-4">
            <select className="form-select mt-4" onChange={() => setArticletype(event.target.value)}>
              <option value='articles'>Article Type</option>
              <option value="articles">All articles</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
          <NoArticlesHeader classes={emptyHeader} articleType={articleType} />
        </div>
        <div className="row">
          {page}
        </div>
      </div>
    </>
  );
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
  const articles = props.articlesArray;
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
