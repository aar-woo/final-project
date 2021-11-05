import React from 'react';
import ColorThiefClass from '../lib/colorThiefClass';
import categorizeColor from '../lib/categorizeColor';
import colorConvert from 'color-convert';
import Resizer from 'react-image-file-resizer';

const colorThief = new ColorThiefClass();

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 'images/hoodieOutline.png',
      imgFile: null,
      imgLoaded: false,
      primaryColorRgb: '',
      secondaryColorRgb: '',
      colorCategory: '',
      colorCategoryId: null,
      secondaryColorCategory: '',
      secondaryColorCategoryId: null,
      articleType: '',
      articleTypeId: null
    };
    this.fileInputRef = React.createRef();
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleImgLoad = this.handleImgLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
  }

  fileChangedHandler(event) {
    const img = URL.createObjectURL(event.target.files[0]);
    this.setState({
      img,
      imgLoaded: false
    });
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
            this.setState({ imgFile: uri });
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

  handleImgLoad(event) {
    if (this.state.img === 'images/hoodieOutline.png') {
      return;
    }
    const $img = document.querySelector('#img');
    const primaryColorRgb = `rgb${colorThief.getRgb($img)}`;
    const secondaryColorRgb = `rgb${colorThief.getPaletteRgb($img)[0]}`;
    const colorCategorized = categorizeColor(colorConvert.rgb.hsl(colorThief.getRgbArr($img)));
    const secondaryColorCategorized = categorizeColor(colorThief.getSecondaryRgbArr($img));

    this.setState({
      imgLoaded: true,
      primaryColorRgb,
      secondaryColorRgb,
      colorCategory: colorCategorized.color,
      colorCategoryId: colorCategorized.id,
      secondaryColorCategory: secondaryColorCategorized.color,
      secondaryColorCategoryId: secondaryColorCategorized.id
    });
  }

  handleTypeSelect(event) { // FIX ME
    const articleType = event.target.value;
    let articleTypeId;
    if (articleType === 'top') {
      articleTypeId = 1;
    }
    if (articleType === 'bottom') {
      articleTypeId = 2;
    } else {
      articleTypeId = 3;
    }
    this.setState({
      articleType,
      articleTypeId
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('colorCategoryId', this.state.colorCategoryId);
    formData.append('secondaryColorCategoryId', this.state.secondaryColorCategoryId);
    formData.append('primaryColor', this.state.primaryColorRgb);
    formData.append('secondaryColor', this.state.secondaryColorRgb);
    formData.append('articleTypeId', this.state.articleTypeId);
    formData.append('image', this.state.imgFile);

    fetch('/api/inventory/1', {
      method: 'POST',
      body: formData
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          img: 'images/hoodieOutline.png',
          imgFile: null,
          imgLoaded: false,
          primaryColorRgb: '',
          secondaryColorRgb: '',
          colorCategory: '',
          colorCategoryId: null,
          secondaryColorCategory: '',
          secondaryColorCategoryId: null,
          articleType: '',
          articleTypeId: null
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
      <div className="row g-0">
        <div className="col-md-6 col-lg-5">
          <img aria-required src={this.state.img} id="img" className="card-img-top border border-dark" onLoad={this.handleImgLoad}/>
        </div>
        <div className="col-md-6 col-lg-7">
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <input className="form-control" type="file" name="image" ref={this.fileInputRef} onChange={this.fileChangedHandler}></input>
              <div className="row mt-2 align-items-end">
                <div className="col-8 col-md-12">
                  <select aria-required className="form-select" value={this.state.articleType} onChange={this.handleTypeSelect}>
                    <option defaultValue="">Article Type</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="shoes">Shoes</option>
                  </select>
                </div>
                <div className="col-2 col-md-12 d-flex pe-0 mt-2">
                  <div className="primary-square" style={{ backgroundColor: `${this.state.primaryColorRgb}` }}>
                  </div>
                </div>
                <div className="col-2 col-md-3 d-flex mt-1">
                  <div className="secondary-square" style={{ backgroundColor: `${this.state.secondaryColorRgb}` }}>
                  </div>
                </div>
                <div className="col-sm-12 col-md-9 d-flex justify-content-end mt-2">
                  <button type="submit" className="btn btn-primary btn-sm pt-1">Upload</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container bottom-container fixed-bottom bg-dark d-flex justify-content-center text-center d-sm-none">
        <div className="camera-img position-fixed">
          <label htmlFor="camera-capture" className="">
            <img src="images/camera.png" className="w-25" />
          </label>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <button type="button" className="btn btn-secondary">
              <label htmlFor="camera-capture">Take A Photo</label></button>
              <input className="d-none" type="file" id="camera-capture" accept="image/*" capture onChange={this.handleFileSelect}/>
          </div>
        </div>
      </div>
    </>

    );

  }
}
