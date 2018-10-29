import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
      </div>
    );
  }
}

export default Login;
