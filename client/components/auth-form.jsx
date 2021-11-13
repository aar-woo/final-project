import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {

  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">@</span>
          <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group my-4">
          <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
          <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="d-grid gap-2 mb-4">
          <button className="btn btn-primary" type="button">Sign Up</button>
        </div>
      </form>
    );
  }

}
