import React from 'react';
import UploadForm from '../components/upload-form';
import Navbar from '../components/navbar';

export default function UploadPage(props) {

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
        </div>
      </>
  );

}
