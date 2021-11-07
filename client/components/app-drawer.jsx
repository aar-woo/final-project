import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

export default function AppDrawer(props) {
  return (
    <div>
      <Offcanvas isOpen={props.isOpen} toggle={props.toggle}>
        <OffcanvasHeader toggle={props.toggle}>
          <h3>Menu</h3>
        </OffcanvasHeader>
        <OffcanvasBody>
          <a href="#" className="text-decoration-none"><h5>Upload</h5></a>
          <a href='#inventory' className="text-decoration-none"><h5>Inventory</h5></a>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}
