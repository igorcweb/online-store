import React, { Component } from 'react';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
      </div>
    );
  }
}

export default Register;
