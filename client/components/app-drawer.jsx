import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

export default function AppDrawer(props) {
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
                <h5>Upload</h5>
              </li>
            </a>
            <a href='#inventory' className="text-decoration-none link-dark">
              <li className="p-3 m-0">
                <h5>Inventory</h5>
              </li>
            </a>
            <a href='#picker' className="text-decoration-none link-dark">
              <li className="p-3 m-0">
                <h5>Outfit Picker</h5>
              </li>
            </a>
            <a href='#outfits' className="text-decoration-none link-dark">
              <li className="p-3 m-0">
                <h5>Outfits</h5>
              </li>
            </a>
          </ul>
           </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}
