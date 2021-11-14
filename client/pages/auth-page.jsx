import React from 'react';
import Navbar from '../components/navbar';
import AppDrawer from '../components/app-drawer';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {

  render() {

    const { user, route, handleSignIn } = this.context;
    const welcomeMessage = route.path === 'sign-in'
      ? 'Login'
      : 'Sign Up';

    if (user) return <Redirect to="" />;

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
                {welcomeMessage}
              </h2>
            </header>
              <AuthForm action={route.path} onSignIn={handleSignIn} />
          </div>
        </div>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
