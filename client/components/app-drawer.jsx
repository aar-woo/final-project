import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

export default function AppDrawer(props) {
  return (
    <div>
      <Offcanvas isOpen={props.isOpen} toggle={props.toggle}>
        <OffcanvasHeader toggle={props.toggle}>
          <h3><u>Menu</u></h3>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0">
          <ul className="ps-0" >
            <li className="p-3 m-0"><a href="#" className="menu-item text-decoration-none link-dark"><h5>Upload</h5></a></li>
            <li className="p-3 m-0"><a href='#inventory' className="menu-item text-decoration-none link-dark"><h5>Inventory</h5></a></li>

          </ul>
           </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}
