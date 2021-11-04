import React from 'react';
import ColorThiefClass from '../lib/colorThiefClass';

const colorThief = new ColorThiefClass();

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imgFile: 'images/hoodieOutline.png',
      imgLoaded: false,
      primaryColorRgb: '',
      secondaryColorRgb: ''
    };
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleImgLoad = this.handleImgLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileSelect(event) {
    const imgFile = URL.createObjectURL(event.target.files[0]);
    this.setState({
      imgFile,
      imgLoaded: false
    });
  }

  handleImgLoad(event) {
    if (this.state.imgFile === 'images/hoodieOutline.png') {
      return;
    }
    const $img = document.querySelector('#imgFile');
    const primaryColorRgb = `rgb${colorThief.getRgb($img)}`;
    const secondaryColorRgb = `rgb${colorThief.getPaletteRgb($img)[0]}`;

    this.setState({
      imgLoaded: true,
      primaryColorRgb,
      secondaryColorRgb
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="row g-0">
        <div className="col-md-6 col-lg-5">
          <img src={this.state.imgFile} id="imgFile" className="card-img-top border border-dark" onLoad={this.handleImgLoad}/>
        </div>
        <div className="col-md-6 col-lg-7">
          <form>
            <div className="card-body">
              <input className="form-control" type="file" id="formFile" onChange={this.handleFileSelect}></input>
              <div className="row mt-2 align-items-end">
                <div className="col-8 col-md-12">
                  <select className="form-select">
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
                  <button type="submit" className="btn btn-primary btn-sm pt-1" onSubmit={this.handleSubmit}>Upload</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );

  }
}
