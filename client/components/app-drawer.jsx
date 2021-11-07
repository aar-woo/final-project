import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

// export default class AppDrawer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isOpen: false };
//     this.toggleMenu = this.toggleMenu.bind(this);
//   }

//   toggleMenu() {
//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   render() {
//     return (
//       <div>
//         <Offcanvas isOpen={this.props.} toggle={this.toggleMenu}>
//           <OffcanvasHeader toggle={this.toggleMenu}>
//             Offcanvas
//           </OffcanvasHeader>
//           <OffcanvasBody>
//             <strong>
//               This is the Offcanvas body.
//             </strong>
//           </OffcanvasBody>
//         </Offcanvas>
//       </div>
//     );
//   }
// }

export default function AppDrawer(props) {
  return (
    <div>
      <Offcanvas isOpen={props.isOpen} toggle={props.toggle}>
        <OffcanvasHeader toggle={props.toggle}>
          <h3>Menu</h3>
        </OffcanvasHeader>
        <OffcanvasBody>
         <a><h5>Inventory</h5></a>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}
