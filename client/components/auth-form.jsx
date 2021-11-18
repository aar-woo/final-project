import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'demo',
      password: 'password',
      networkError: false
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
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          networkError: true
        });
      });
  }

  render() {
    let networkErrorClass = 'd-none';
    if (this.state.networkError) {
      networkErrorClass = 'col-7 col-md-8 d-flex justify-content-end';
    }
    const { action } = this.props;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Login instead'
      : 'Sign up now';
    const submitButtonText = action === 'sign-up'
      ? 'Sign Up'
      : 'Login';
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
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" type="submit">{submitButtonText}</button>
        </div>
        <div className="row mb-4">
          <div className="col-5 col-md-4">
            <a className="text-muted" href={alternateActionHref}>
              {alternatActionText}
            </a>
          </div>
          <div className={networkErrorClass}>
            <h6>Sorry, there was an error connecting to the network!</h6>
          </div>
        </div>
      </form>
    );
  }

}
