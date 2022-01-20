import React, { useState } from 'react';

export default function AuthForm(props) {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password');
  const [networkError, setNetworkError] = useState(false);

  async function handleSubmit() {
    event.preventDefault();
    const { action } = props;
    const user = { username, password };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch(`/api/auth/${action}`, req);
      const result = await response.json();
      if (action === 'sign-up') {
        window.location.hash = 'sign-in';
      } else if (result.user && result.token) {
        props.onSignIn(result);
      }
    } catch (err) {
      console.error(err);
      setNetworkError(true);
    }
  }

  let networkErrorClass = 'd-none';
  if (networkError) {
    networkErrorClass = 'col-7 col-md-8 d-flex justify-content-end';
  }
  const { action } = props;
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
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input required type="text" value={username} className="form-control"
          placeholder="Username" aria-label="Username" name="username" aria-describedby="basic-addon1" autoFocus onChange={() => setUsername(event.target.value)} />
      </div>
      <div className="input-group my-4">
        <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
        <input required type="password" value={password} className="form-control"
          placeholder="Password" aria-label="Password" name="password" aria-describedby="basic-addon1" onChange={() => setPassword(event.target.value)} />
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
