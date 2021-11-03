import React from 'react';

export default class UploadForm extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-10 col-md-8">

            <div className="card shadow border border-dark">
              <div className="row g-0">
                  <div className="col-md-6 col-lg-5">
                    <img src="images/hoodieOutline.png" className="card-img-top img-thumbnail border border-dark" />
                </div>
                <div className="col-md-6 col-lg-7">
                    <form>
                      <div className="card-body">
                        <input className="form-control" type="file" id="formFile"></input>
                        <div className="row mt-2 align-items-end">
                          <div className="col-8 col-md-12">
                            <select className="form-select">
                              <option selected="">Article Type</option>
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                              <option value="shoes">Shoes</option>
                            </select>
                          </div>
                          <div className="col-2 col-md-12 d-flex pe-0 mt-2">
                            <div className="primary-square">
                            </div>
                          </div>
                          <div className="col-2 col-md-3 d-flex mt-1">
                            <div className="secondary-square">
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-9 d-flex justify-content-end mt-2">
                            <button className="btn btn-primary btn-sm pt-1">Upload</button>
                          </div>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-4 d-sm-none">
          <h3>or</h3>
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
              <input className="d-none" type="file" id="camera-capture" accept="image/*" capture />
            </div>
          </div>
        </div>
      </div>

      </>
    );

  }
}
