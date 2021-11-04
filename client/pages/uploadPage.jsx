import React from 'react';
import UploadForm from '../components/upload-form';
import Navbar from '../components/navbar';

export default class UploadPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-10 col-md-8">
              <div className="card shadow border border-dark">
                <UploadForm />
              </div>
            </div>
          </div>
          <div className="row text-center mt-5 d-sm-none">
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
