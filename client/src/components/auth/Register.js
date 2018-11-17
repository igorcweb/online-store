import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container my-4 pt-2 content">
        <div className="row">
          <div className="mx-auto col-md-12 col-lg-10">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="card mb-5 px-1 pt-5 pb-4">
                  <div className="register">
                    <i className="ml-4 fas fa-lock" />
                    <h5 className="d-inline card-title ml-2">Register</h5>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <label htmlFor="Name" className="label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-invalid': errors.name
                              }
                            )}
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="Email" className="label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-invalid': errors.email
                              }
                            )}
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="Password" className="label">
                            Password
                          </label>
                          <input
                            type="password"
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-invalid': errors.password
                              }
                            )}
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="Password" className="label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-invalid': errors.password2
                              }
                            )}
                            name="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                          />
                          {errors.password2 && (
                            <div className="invalid-feedback">
                              {errors.password2}
                            </div>
                          )}
                        </div>

                        <small className="text-under text-muted">
                          Password must be between 6 and 30 characters
                        </small>

                        <input
                          type="submit"
                          className="btn btn-brown-custom  btn-block mt-4 py-2"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="card mb-5 py-5 px-1">
                  <h5 className="card-title ml-3">Already have an account?</h5>
                  <div className="card-body pb-5">
                    <Link
                      to="/login"
                      className="btn btn-success-custom btn-block"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
