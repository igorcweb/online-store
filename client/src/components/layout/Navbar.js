import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { toggleCart } from '../../actions/cartActions';

class Navbar extends Component {
  state = {
    search: ''
  };

  onCartClick = () => {
    this.props.toggleCart();
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push('/loading');
    setTimeout(() => {
      this.props.history.push('/search/' + this.state.search);
      this.setState({ search: '' });
    }, 0.001);
  };

  render() {
    const cartItems = this.props.cart.cartItems;
    const { isAuthenticated, user } = this.props.auth;

    const navbarLogo = (
      <Link to="/" className="navbar-brand ml-3">
        <img
          src="../assets/images/logoforonlinestore1.png"
          width="100"
          alt=""
        />
      </Link>
    );

    const searchBar = (
      <form className="ml-3" onSubmit={this.onSubmit}>
        <div>
          <input
            className="form-control pl-5 text-white search"
            type="text"
            placeholder="Search Products"
            aria-label="Search"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
          />
        </div>
      </form>
    );

    const burgerIcon = (
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>
          <i className="fas fa-bars" />
        </span>
      </button>
    );
    const navMenu = (
      <div className="collapse navbar-collapse mx-3" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item custom-link ml-4 pt-1">
            <Link to="/groceries" className="bold-light-gray">
              GROCERIES
            </Link>
          </li>
          <li className="nav-item custom-link ml-4 pt-1">
            <Link to="/supplements" className="bold-light-gray">
              SUPPLEMENTS
            </Link>
          </li>
          <li className="nav-item  custom-link ml-4 pt-1">
            <Link to="/clothing" className="bold-light-gray pb-3">
              CLOTHING
            </Link>
          </li>
        </ul>
        {searchBar}
      </div>
    );

    const navMsg = (
      <span className="d-none navMsg d-md-block">
        <small>Free U.S. Shipping for Prime Members*</small>
      </span>
    );

    const authLinks = (
      <ul className="ml-auto pr-5">
        <li className="d-inline px-2" onClick={this.onCartClick}>
          <i className="fas fa-shopping-cart" />
          <span className="class-items ml-1">{cartItems}</span>
        </li>
        <Link to="/dashboard">
          <span className="name px-2 px-sm-3 px-md-4">{user.name}</span>
        </Link>

        <li className="d-inline pl-2">
          <span className="nav-link1 logout" onClick={this.onLogoutClick}>
            Logout
          </span>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="ml-auto pr-5">
        <li className="d-inline px-2" onClick={this.onCartClick}>
          <i className="fas fa-shopping-cart" />
          <span className="class-items ml-1">{cartItems}</span>
        </li>
        <li className="d-inline px-4">
          <Link className="nav-link1" to="/register">
            Register
          </Link>
        </li>
        <li className="d-inline pl-2">
          <Link className="nav-link1" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <div className="divup">
        <nav className="nav-top">
          <div className="container-fluid">
            <div className="d-flex nav-cont row pt-2">
              {navMsg} {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-nav navbar-expand-md navbar-light bg-white">
          <div className="container-fluid">
            {navbarLogo}
            {burgerIcon}
            {navMenu}
          </div>
        </nav>
      </div>
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
  { logoutUser, toggleCart }
)(Navbar);
