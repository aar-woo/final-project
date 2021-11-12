import React from 'react';

// maybe a function, if don't need state, since passing data through props?
export default class Outfit extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container col-12 col-sm-6 outfit-container border border-dark border-2 rounded p-2 mt-4 bg-light">
        <div className="row d-flex justify-content-center">
          <OutfitArticle />
          <OutfitArticle />
          <OutfitArticle />
        </div>
      </div>
    );
  }
}

function OutfitArticle(props) {
  return (
    <div className="col-12 col-sm-12 d-flex justify-content-center outfit-article my-2">
      <img src={'/images/image-1636594024569.JPEG'} className="border border-2 border-dark shadow" />
      <div className="d-flex align-items-end">
        <a><div className="primary-square mx-2 shadow-sm" style={{ backgroundColor: `${'blue'}` }}></div></a>
        <a><div className="secondary-square shadow-sm" style={{ backgroundColor: `${'black'}` }} ></div></a>
      </div>
    </div>
  );
}
