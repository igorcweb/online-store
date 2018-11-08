import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { updateCartItems } from '../actions/cartActions';
import classnames from 'classnames';

class Groceries extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  render() {
    // const { user } = this.props;
    // console.log('user:', user);
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems.forEach(item => {
      console.log(item.name, item.quantity);
    });
    return (
      <div
        className={classnames('card cart shadow-lg bg-white rounded', {
          isShowing: this.props.cart.cartShowing
        })}
      >
        <div className="card-body">
          <div className="card-title-img">
            <div className="card-title">
              <h6 className="card-title-subtext mb-0">
                Total: $<span className="subtotal">0.00</span>
              </h6>
            </div>
          </div>
          <div className="container">
            <ul className="addedClasses mx-auto" />
            <button className="proceed btn btn-sm bg-blue text-white mb-3 mx-auto ">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Groceries.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCurrentUser, updateCartItems }
)(Groceries);
