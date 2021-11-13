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
        <nav className="navbar d-flex justify-content-start align-items-center p-3 bg-dark">
          <a onClick={this.toggleMenu}>
            <i className="text-white fas fa-bars icon-x-large"></i>
          </a>
          <h3 className="text-white mb-1 ms-3">{this.props.pageHeader}</h3>
        </nav>
        <AppDrawer isOpen={this.state.menuIsOpen} toggle={this.toggleMenu}/>
      </>
    );
  }
}
