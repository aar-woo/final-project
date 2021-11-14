import React from 'react';
import ColorThiefClass from '../lib/colorThiefClass';
import categorizeColor from '../lib/categorizeColor';
import colorConvert from 'color-convert';
import Resizer from 'react-image-file-resizer';
import ColorSelect from './color-select';
import AppContext from '../lib/app-context';

const colorThief = new ColorThiefClass();

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 'images/hoodiePlaceholder.png',
      imgFile: null,
      imgLoaded: false,
      primaryColor: '',
      secondaryColor: '',
      colorCategory: 'Color',
      colorCategoryId: null,
      secondaryColorCategory: 'Color',
      secondaryColorCategoryId: null,
      articleType: '',
      articleTypeId: null,
      colorCategorySelect: 'Primary'
    };
    this.fileInputRef = React.createRef();
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleImgLoad = this.handleImgLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.switchSelect = this.switchSelect.bind(this);
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
    const primaryColor = `rgb${colorThief.getRgb($img)}`;
    const secondaryColor = `rgb${colorThief.getPaletteRgb($img)[0]}`;
    const colorCategorized = categorizeColor(colorConvert.rgb.hsl(colorThief.getRgbArr($img)));
    const secondaryColorCategorized = categorizeColor(colorThief.getSecondaryRgbArr($img));

    this.setState({
      imgLoaded: true,
      primaryColor,
      secondaryColor,
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
    let colorSelected = event.target.value;
    const colorIds = {
      black: 1,
      white: 2,
      grey: 3,
      red: 4,
      yellow: 5,
      green: 6,
      cyan: 7,
      blue: 8,
      magenta: 9,
      khaki: 10,
      none: 0
    };
    let colorId = colorIds[colorSelected];

    if (this.state.colorCategorySelect === 'Primary') {
      this.setState({
        colorCategory: colorSelected,
        colorCategoryId: colorId,
        primaryColor: colorSelected
      });
    } else {
      if (colorSelected === 'none') {
        colorSelected = this.state.colorCategory;
        colorId = this.state.colorCategoryId;
      }
      this.setState({
        secondaryColorCategory: colorSelected,
        secondaryColorCategoryId: colorId,
        secondaryColor: colorSelected
      });
    }
  }

  switchSelect(event) {
    if (event.target.matches('.secondary-square') || event.target.matches('.secondary-select')) {
      this.setState({
        colorCategorySelect: 'Secondary'
      });
    } else {
      this.setState({
        colorCategorySelect: 'Primary'
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const userId = this.context.user.userId;
    const token = this.context.token;

    formData.append('colorCategoryId', this.state.colorCategoryId);
    formData.append('secondaryColorCategoryId', this.state.secondaryColorCategoryId);
    formData.append('primaryColor', this.state.primaryColor);
    formData.append('secondaryColor', this.state.secondaryColor);
    formData.append('articleTypeId', this.state.articleTypeId);
    formData.append('image', this.state.imgFile);

    fetch(`/api/inventory/${userId}`, {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          img: 'images/hoodiePlaceholder.png',
          imgFile: null,
          imgLoaded: false,
          primaryColor: '',
          secondaryColor: '',
          colorCategory: 'Color',
          colorCategoryId: null,
          secondaryColorCategory: 'Color',
          secondaryColorCategoryId: null,
          articleType: '',
          articleTypeId: null,
          colorCategorySelect: 'Primary'
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    let primaryColorSelect;
    let secondaryColorSelect;
    if (this.state.colorCategorySelect === 'Primary') {
      primaryColorSelect = 'col-8 d-block d-lg-none';
      secondaryColorSelect = 'secondary-select d-none';
    } else {
      primaryColorSelect = 'd-none';
      secondaryColorSelect = 'secondary-select col-8 d-block d-lg-none';
    }
    return (
      <>
        <div className="row g-0">
          <div className="col-md-6 col-lg-5">
            <img src={this.state.img} id="img" className="card-img-top img-thumbnail border-dark" onLoad={this.handleImgLoad}/>
          </div>
          <div className="col-md-6 col-lg-7">
            <form onSubmit={this.handleSubmit}>
              <div className="card-body">
                <h5 className="d-none d-sm-block"><u>Upload</u></h5>
                <input required className="form-control" type="file" name="image" ref={this.fileInputRef} onChange={this.fileChangedHandler}></input>
                <div className="row mt-2 align-items-end align-items-lg-start justify-content-center">
                  <ColorSelect classes={primaryColorSelect} selectClasses='form-select' colorCategory={this.state.colorCategory} value={this.state.colorCategory}
                    colorCategorySelect='Primary' onChange={this.handleColorSelect}/>
                  <ColorSelect classes={secondaryColorSelect} selectClasses='form-select secondary-select' colorCategory={this.state.secondaryColorCategory} value={this.state.secondaryColorCategory}
                    colorCategorySelect='Secondary' onChange={this.handleColorSelect} />
                  <div className="col-4 col-lg-1 d-flex align-items-end align-items-lg-start ps-xs-0 ps-md-0 justify-content-around flex-lg-column mt-2 mt-lg-0" onClick={this.switchSelect}>
                    <a><div className="primary-square" style={{ backgroundColor: `${this.state.primaryColor}` }}></div></a>
                    <a><div className="secondary-square mt-3" style={{ backgroundColor: `${this.state.secondaryColor}` }}></div></a>
                  </div>
                  <div className="col-lg-5 ms-2 ps-2" onClick={this.switchSelect}>
                    <ColorSelect classes="col-12 d-none d-lg-block" selectClasses='form-select' colorCategory={this.state.colorCategory} value={this.state.colorCategory}
                      colorCategorySelect='Primary' onChange={this.handleColorSelect}/>
                    <ColorSelect classes="secondary-select col-12 d-none d-lg-block mt-2" selectClasses='form-select secondary-select' colorCategory={this.state.secondaryColorCategory} value={this.state.secondaryColorCategory}
                      colorCategorySelect='Secondary' onChange={this.handleColorSelect}/>
                  </div>
                  <div className="col-12 col-lg-5 d-flex d-lg-block pe-lg-0">
                    <div className="col-8 col-lg-12 pe-2 pe-lg-0">
                      <select required className="form-select mt-2 mt-lg-0" value={this.state.articleType} onChange={this.handleTypeSelect}>
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

UploadForm.contextType = AppContext;
