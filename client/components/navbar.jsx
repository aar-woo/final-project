import React, { useState, useContext } from 'react';
import AppDrawer from './app-drawer';
import AppContext from '../lib/app-context';

export default function Navbar(props) {
  const [menuOpen, toggleMenu] = useState(false);
  const { user } = useContext(AppContext);
  let menuClass = 'text-white fas fa-bars icon-x-large';

  if (!user) {
    menuClass = 'd-none';
  }

  return (
    <>
      <nav className="navbar bg-dark p-0">
        <div className="col-7 d-flex justify-content-start align-items-center p-3">
          <a onClick={() => toggleMenu(!menuOpen)}>
            <i className={menuClass}></i>
          </a>
          <h3 className="text-white mb-1 mx-2">{props.pageHeader}</h3>
        </div>
        <div className="col-5 d-flex justify-content-end">
          <h3 className="text-white my-4 me-4">Pick-A-Fit</h3>
        </div>
      </nav>
      <AppDrawer isOpen={menuOpen} toggle={() => toggleMenu(!menuOpen)} />
    </>
  );
}

// Navbar.contextType = AppContext;
