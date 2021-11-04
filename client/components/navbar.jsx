import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeader: 'Upload',
      menuOpen: false
    };

  }

  openAppDrawer() {

  }

  render() {
    return (
      <nav className="navbar p-3 bg-dark m-0">
        <li className="nav-item">
          <h3 className="text-white d-inline p-3">{this.state.navHeader}</h3>
        </li>
      </nav>
    );
  }
}
