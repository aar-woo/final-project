import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import AuthForm from '../components/auth-form';

export default class AuthPage extends React.Component {

  render() {
    return (
      <>
        <Navbar pageHeader='' />
        <AppDrawer />
        <div className="row d-flex justify-content-center pt-5 mt-4">
          <img src="images/authIcon.jpg" className="auth-img" />
        </div>
        <div className="row pt-2 align-items-center justify-content-center">
          <div className="col-10 col-md-8  col-xl-4 border border-2 shadow">
            <header className="text-center">
              <h2 className="my-3">
                Sign Up
              </h2>
            </header>
              <AuthForm />
          </div>
        </div>
      </>
    );
  }
}
