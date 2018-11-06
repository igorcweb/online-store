import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  incrementCartItems,
  decrementCartItems
} from '../../actions/cartActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.replace('/');
  };

  render() {
    const cartItems = this.props.cart.cartItems;
    console.log(cartItems);
    const { isAuthenticated, user } = this.props.auth;
    const navbarLogo = (
      <Link to="/" className="navbar-brand mx-auto">
        <img src="../assets/images/logoos.png" width="75" alt="" />
      </Link>
    );
    const navMenu = (
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/groceries" className="nav-link">
              GROCERIES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/supplements" className="nav-link">
              SUPPLEMENTS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clothing" className="nav-link">
              CLOTHING
            </Link>
          </li>
        </ul>
      </div>
    );

    const authLinks = (
      <div className="ml-auto navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mt-2 mr-sm-3">
            <i className="fas fa-shopping-cart" />
            <span className="class-items ml-1">{cartItems}</span>
          </li>
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
          {navbarLogo}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {navMenu} {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { logoutUser, incrementCartItems, decrementCartItems }
)(Navbar);
