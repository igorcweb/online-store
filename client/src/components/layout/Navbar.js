import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.replace('/');
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const navbarLogo = (
      <a href="/" className="navbar-brand mx-auto">
        <img src="../assets/images/logoos.png" width="75" alt="" />
      </a>
    );
    const navMenu = (
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/" className="nav-link">
              GROCERIES
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              SUPPLEMENTS
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              CLOTHING
            </a>
          </li>
        </ul>
      </div>
    );

    const authLinks = (
      <div className="ml-auto navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <span className="name pt-2">{user.name}</span>
          <li className="nav-item">
            <span className="nav-link" onClick={this.onLogoutClick}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    );
    const guestLinks = (
      <div className="ml-auto navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white mb-4 fixed-top">
        <div className="container-fluid">
          {navbarLogo} {navMenu} {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
