import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Upload'
    };
  }

  render() {
    return (
      <nav className="navbar p-3 bg-dark m-0">
        <li className="nav-item">
          <h3 className="text-white d-inline p-3">{this.state.page}</h3>
        </li>
      </nav>
    );
  }
}
