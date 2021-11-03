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
    // const drawerClass = 'app-drawer';
    return (
      <>
        <ul className="navbar p-3 bg-dark m-0">
          <li className="nav-item">
            <a href="#">
              <i className="text-white fas fa-bars icon-x-large" onClick={this.openAppDrawer}></i>
            </a>
            <h3 className="text-white d-inline p-3">{this.state.navHeader}</h3>
          </li>
        </ul>
        <div className="container-sm m-0 p-0">
          <div className="row align-items-start">
            <div className="col-4">
              <nav className="navbar flex-column bg-secondary">
                <h2 className="text-white"><u>Menu</u></h2>
              </nav>
            </div>
          </div>
        </div>
        {/* <ul className={drawerClass + 'nav flex-column position-absolute'}>
        </ul> */}
      </>
    );
  }
}
