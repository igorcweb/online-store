import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container my-4 pt-2">
        <div className="row">
          <div className="offset-1 col-md-10">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="card mb-5 px-1 pt-5 pb-1">
                  <div className="login content">
                    <i className="ml-4 fas fa-lock" />
                    <h5 className="d-inline card-title ml-2">Log In</h5>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <label htmlFor="name" className="label">
                            {' '}
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
                        <input
                          type="submit"
                          className="btn brown btn-block mt-4"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="card mb-5 py-5 px-1">
                  <h5 className="card-title ml-3">No account yet?</h5>
                  <div className="card-body pb-5">
                    <Link to="/register" className="btn success btn-block">
                      Register
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
