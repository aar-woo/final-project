import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          username: '',
          password: ''
        });
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">@</span>
          <input required type="text" value={this.state.username} className="form-control"
            placeholder="Username" aria-label="Username" name="username" aria-describedby="basic-addon1" autoFocus onChange={this.handleChange}/>
        </div>
        <div className="input-group my-4">
          <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
          <input required type="password" value={this.state.password} className="form-control"
            placeholder="Password" aria-label="Password" name="password" aria-describedby="basic-addon1" onChange={this.handleChange}/>
        </div>
        <div className="d-grid gap-2 mb-4">
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </div>
      </form>
    );
  }

}
