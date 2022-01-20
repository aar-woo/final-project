import React, { useState, useEffect, useContext, useRef } from 'react';
import ColorThiefClass from '../lib/colorThiefClass';
import categorizeColor from '../lib/categorizeColor';
import colorConvert from 'color-convert';
import Resizer from 'react-image-file-resizer';
import ColorSelect from './color-select';
import AppContext from '../lib/app-context';
import { Spinner } from 'reactstrap';

const colorThief = new ColorThiefClass();

export default function UploadForm(props) {
  const [img, setImg] = useState('images/hoodiePlaceholder.png');
  const [imgFile, setImgFile] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [colorCategory, setColorCategory] = useState('Color');
  const [colorCategoryId, setColorCategoryId] = useState(null);
  const [secondaryColorCategory, setSecondaryColorCategory] = useState('Color');
  const [secondaryColorCategoryId, setSecondaryColorCategoryId] = useState(null);
  const [articleType, setArticleType] = useState('');
  const [articleTypeId, setArticleTypeId] = useState(null);
  const [colorCategorySelect, setColorCategorySelect] = useState('Primary');
  const [networkError, setNetworkError] = useState(false);
  const fileInputRef = useRef(null);

  function fileChangedHandler(event) {
    const img = URL.createObjectURL(event.target.files[0]);
    setImg(img);
    setImgLoaded(false);
    setNetworkError(false); // needed?
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          400,
          400,
          'JPEG',
          100,
          0,
          uri => {
            setImgFile(uri);
          },
          'file',
          200,
          200
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    if (this.state.img === 'images/hoodiePlaceholder.png') {
      return;
    }
    const $img = document.querySelector('#img');
    const primaryColor = `rgb${colorThief.getRgb($img)}`;
    const secondaryColor = `rgb${colorThief.getPaletteRgb($img)[0]}`;
    const colorCategorized = categorizeColor(colorConvert.rgb.hsl(colorThief.getRgbArr($img)));
    const secondaryColorCategorized = categorizeColor(colorConvert.rgb.hsl(colorThief.getSecondaryRgbArr($img)));
    setPrimaryColor(primaryColor);
    setSecondaryColor(secondaryColor);
    setColorCategory(colorCategorized.color);
    setColorCategoryId(colorCategorized.id);
    setSecondaryColor(secondaryColorCategorized.color);
    setSecondaryColorCategoryId(secondaryColorCategorized.id);
  }, [imgLoaded]);

  useEffect(() => {
    let articleTypeId;
    if (articleType === 'top') {
      articleTypeId = 1;
    } else if (articleType === 'bottom') {
      articleTypeId = 2;
    } else {
      articleTypeId = 3;
    }
    setArticleTypeId(articleTypeId);
  }, [articleType])

  return (
    <>
      <div className="row g-0">
        <div className={spinnerImgClass}>
          <div className="col-12 d-flex align-items-center justify-content-center" >
            <Spinner className={spinnerClass} />
            <h4 className={networkErrorClass}>Sorry, there was an error connecting to the network!</h4>
          </div>
          <img src={img} id="img" className={imgClass} onLoad={() => setImgLoaded(true)} />
        </div>
        <div className="col-md-6 col-lg-7">
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <h5 className="d-none d-sm-block"><u>Upload</u></h5>
              <input required className="form-control" type="file" name="image" ref={fileInputRef} onChange={this.fileChangedHandler}></input>
              <div className="row mt-2 align-items-end align-items-lg-start justify-content-center">
                <ColorSelect classes={primaryColorSelect} selectClasses='form-select' colorCategory={colorCategory} value={colorCategory}
                  colorCategorySelect='Primary' onChange={this.handleColorSelect} />
                <ColorSelect classes={secondaryColorSelect} selectClasses='form-select secondary-select' colorCategory={secondaryColorCategory} value={secondaryColorCategory}
                  colorCategorySelect='Secondary' onChange={this.handleColorSelect} />
                <div className="upload-squares col-4 col-lg-1 d-flex align-items-end align-items-lg-start ps-xs-0 ps-md-0 justify-content-around flex-lg-column mt-2 mt-lg-0" onClick={this.switchSelect}>
                  <a><div className="primary-square" style={{ backgroundColor: `${primaryColor}` }}></div></a>
                  <a><div className="secondary-square mt-3" style={{ backgroundColor: `${secondaryColor}` }}></div></a>
                </div>
                <div className="col-lg-5 ms-2 ps-2" onClick={this.switchSelect}>
                  <ColorSelect classes="col-12 d-none d-lg-block" selectClasses='form-select' colorCategory={colorCategory} value={colorCategory}
                    colorCategorySelect='Primary' onChange={this.handleColorSelect} />
                  <ColorSelect classes="secondary-select col-12 d-none d-lg-block mt-2" selectClasses='form-select secondary-select' colorCategory={secondaryColorCategory} value={secondaryColorCategory}
                    colorCategorySelect='Secondary' onChange={this.handleColorSelect} />
                </div>
                <div className="col-12 col-lg-5 d-flex d-lg-block pe-lg-0">
                  <div className="col-8 col-lg-12 pe-2 pe-lg-0">
                    <select required className="form-select mt-2 mt-lg-0" value={articleType} onChange={() => setArticleType(event.target.value)}>
                      <option defaultValue="">Article Type</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="shoes">Shoes</option>
                    </select>
                  </div>
                  <div className="col-4 col-lg-12 d-flex justify-content-end mt-2">
                    <button type="submit" className="btn btn-primary btn-sm pt-1">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
