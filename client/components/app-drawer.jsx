import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import AppContext from '../lib/app-context';

export default class AppDrawer extends React.Component {

  render() {
    const { handleSignOut } = this.context;
    const props = this.props;
    return (
      <div>
        <Offcanvas isOpen={props.isOpen} toggle={props.toggle}>
          <OffcanvasHeader toggle={props.toggle}>
            <u className="fs-3">Menu</u>
          </OffcanvasHeader>
          <OffcanvasBody className="p-0">
            <ul className="ps-0" >
              <a href="#" className="text-decoration-none link-dark">
                <li className="p-3 m-0">
                  <h5><i className="fas fa-upload pe-3"></i>Upload</h5>
                </li>
              </a>
              <a href='#inventory' className="text-decoration-none link-dark">
                <li className="p-3 m-0 ">
                  <h5><i className="fas fa-tshirt pe-3"></i>Inventory</h5>
                </li>
              </a>
              <a href='#picker' className="text-decoration-none link-dark">
                <li className="p-3 m-0">
                  <h5><i className="fas fa-person-booth pe-3"></i>Outfit Picker</h5>
                </li>
              </a>
              <a href='#outfits' className="text-decoration-none link-dark">
                <li className="p-3 m-0">
                  <h5><i className="fas fa-user-astronaut pe-3"></i>Outfits</h5>
                </li>
              </a>
              <a href='#sign-in' className="text-decoration-none link-dark" onClick={handleSignOut}>
                <li className="p-3 m-0">
                  <h5><i className="fas fa-sign-out-alt pe-3"></i>Logout</h5>
                </li>
              </a>
            </ul>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    );
  }
}

AppDrawer.contextType = AppContext;
