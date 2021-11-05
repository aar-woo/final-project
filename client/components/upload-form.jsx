import React from 'react';
import ColorThiefClass from '../lib/colorThiefClass';
import categorizeColor from '../lib/categorizeColor';
import colorConvert from 'color-convert';
import Resizer from 'react-image-file-resizer';
import ColorSelect from './color-select';

const colorThief = new ColorThiefClass();

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 'images/hoodiePlaceholder.png',
      imgFile: null,
      imgLoaded: false,
      primaryColorRgb: '',
      secondaryColorRgb: '',
      colorCategory: 'Color',
      colorCategoryId: null,
      secondaryColorCategory: '',
      secondaryColorCategoryId: null,
      articleType: '',
      articleTypeId: null,
      colorCategorySelect: 'Primary' // add to wherever setState() appears
    };
    this.fileInputRef = React.createRef();
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleImgLoad = this.handleImgLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
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
    if (this.state.img === 'images/hoodiePlaceholder.png') {
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

  handleTypeSelect(event) {
    const articleType = event.target.value;
    let articleTypeId;
    if (articleType === 'top') {
      articleTypeId = 1;
    } else if (articleType === 'bottom') {
      articleTypeId = 2;
    } else {
      articleTypeId = 3;
    }
    this.setState({
      articleType,
      articleTypeId
    });
  }

  handleColorSelect(event) {
    // console.log('color selected');
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
          img: 'images/hoodiePlaceholder.png',
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
            <img aria-required src={this.state.img} id="img" className="card-img-top img-thumbnail border-dark" onLoad={this.handleImgLoad}/>
          </div>
          <div className="col-md-6 col-lg-7">
            <form onSubmit={this.handleSubmit}>
              <div className="card-body pb-md-0">
                <h5 className="d-none d-sm-block"><u className="d-sm-none d-md-block">Upload</u></h5>
                <input className="form-control" type="file" name="image" ref={this.fileInputRef} onChange={this.fileChangedHandler}></input>
                <div className="row mt-3 align-items-end align-items-lg-start">
                    <ColorSelect divClasses="col-8 d-block d-lg-none" colorCategory={this.state.colorCategory} value={this.state.colorCategory} colorCategorySelect={this.state.colorCategorySelect} onChange={this.handleColorSelect}/>
                  <div className="col-4 col-lg-1 d-flex align-items-end align-items-lg-start ps-xs-0 ps-md-0 justify-content-around flex-lg-column mt-2 mt-lg-0">
                    <div className="primary-square" style={{ backgroundColor: `${this.state.primaryColorRgb}` }}>
                    </div>
                    <div className="secondary-square mt-3" style={{ backgroundColor: `${this.state.secondaryColorRgb}` }}>
                    </div>
                  </div>
                  <div className="col-lg-5 ms-2">
                    <ColorSelect divClasses="col-12 d-none d-lg-block" colorCategory={this.state.colorCategory} value={this.state.colorCategory} colorCategorySelect={this.state.colorCategorySelect} onChange={this.handleColorSelect} />
                    <ColorSelect divClasses="col-12 d-none d-lg-block mt-2" colorCategory={this.state.secondaryColorCategory} value={this.state.secondaryColorCategory} colorCategorySelect={this.state.colorCategorySelect} onChange={this.handleColorSelect} />
                  </div>
                  <div className="col-12 col-lg-5 d-flex d-lg-block">
                    <div className="col-8 col-lg-12 pe-2 pe-lg-0">
                      <select aria-required className="form-select mt-2 mt-lg-0" value={this.state.articleType} onChange={this.handleTypeSelect}>
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
        <div className="container bottom-container fixed-bottom bg-dark d-flex justify-content-center text-center d-sm-none">
          <div className="camera-img position-fixed">
            <label htmlFor="camera-capture" className="">
              <img src="images/camera.png" className="w-25"/>
            </label>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <button type="button" className="btn btn-secondary">
                <label htmlFor="camera-capture">Take A Photo</label></button>
                <input className="d-none" type="file" id="camera-capture" accept="image/*" capture onChange={this.fileChangedHandler}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}
