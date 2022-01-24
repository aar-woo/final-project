import React, { useContext } from 'react';
import UploadForm from '../components/upload-form';
import Navbar from '../components/navbar';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default function UploadPage(props) {
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  return (
    <>
      <Navbar pageHeader='Upload' />
      <div className="container mt-5 pt-4">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-10 col-md-8">
            <div className="card shadow border border-dark">
              <UploadForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
