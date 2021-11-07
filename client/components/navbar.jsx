import React from 'react';
import AppDrawer from './app-drawer';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Upload',
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
        <nav className="navbar d-flex justify-content-start p-3 bg-dark m-0">
            <a href="#" onClick={this.toggleMenu}>
              <i className="text-white fas fa-bars icon-x-large" onClick={this.openAppDrawer}></i>
            </a>
          <li className="nav-item">
            <h3 className="text-white d-inline">{this.state.page}</h3>
          </li>
        </nav>
        <AppDrawer isOpen={this.state.menuIsOpen} toggle={this.toggleMenu}/>
      </>
    );
  }
}
