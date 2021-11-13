import React from 'react';
import AppDrawer from './app-drawer';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    return (
      <>
        <nav className="navbar bg-dark p-0">
          <div className="col-7 d-flex justify-content-start align-items-center p-3">
            <a onClick={this.toggleMenu}>
              <i className="text-white fas fa-bars icon-x-large"></i>
            </a>
            <h3 className="text-white mb-1 mx-2">{this.props.pageHeader}</h3>
          </div>
          <div className="col-5 d-flex justify-content-end">
            <h3 className="text-white mb-1 me-4">Pick-A-Fit</h3>
          </div>
        </nav>
        <AppDrawer isOpen={this.state.menuIsOpen} toggle={this.toggleMenu}/>
      </>
    );
  }
}
