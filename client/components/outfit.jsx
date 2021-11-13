import React from 'react';

export default function Outfit(props) {
  const outfitArticles = props.outfitArticles;
  const outfitNum = props.outfitNum + 1;
  let topArticle;
  let bottomArticle;
  let shoesArticle;

  for (let i = 0; i < outfitArticles.length; i++) {
    const articleTypeId = outfitArticles[i].articleTypeId;
    if (articleTypeId === 1) {
      topArticle = outfitArticles[i];
    } else if (articleTypeId === 2) {
      bottomArticle = outfitArticles[i];
    } else {
      shoesArticle = outfitArticles[i];
    }
  }

  return (
    <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center my-3">
      <div className="outfit-container border border-dark border-2 rounded-2 p-2 mt-4 bg-light">
        <h5>Outfit {outfitNum}</h5>
        <div className="row d-flex justify-content-center">
          <OutfitArticle article={topArticle} />
          <OutfitArticle article={bottomArticle} />
          <OutfitArticle article={shoesArticle} />
        </div>
      </div>
    </div>
  );
}

function OutfitArticle(props) {
  const article = props.article;
  return (
    <div className="col-12 d-flex justify-content-center outfit-article my-2">
      <img src={article.imgUrl} className="border border-2 border-dark shadow" />
      <div className="d-flex align-items-end">
        <a><div className="primary-square mx-2 shadow-sm" style={{ backgroundColor: `${article.primaryColor}` }}></div></a>
        <a><div className="secondary-square shadow-sm" style={{ backgroundColor: `${article.secondaryColor}` }} ></div></a>
      </div>
    </div>
  );
}
