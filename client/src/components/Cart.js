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

  onPlus = (_id, name, quantity) => {
    console.log(_id, name, quantity);
  };

  render() {
    // const { user } = this.props;
    // console.log('user:', user);
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const cartItemsNum = localStorage.getItem('cartItems');
    let subtotal;
    if (cartItems) {
      subtotal = cartItems.reduce((acc, item) => {
        const price = item.quantity * item.price;
        return acc + price;
      }, 0);
    }
    return (
      <div
        className={classnames('card cart shadow-lg bg-white rounded', {
          isShowing: this.props.cart.cartShowing
        })}
      >
        <div className="card-body">
          <div className="card-title-img">
            <div className="card-title">
              <h5 className="card-title-text text-center">
                {cartItemsNum} Items Selected
              </h5>
              <h6 className="card-title-subtext mb-0 text-center">
                Subtotal: ${subtotal ? subtotal.toFixed(2) : '0.00'}
              </h6>
            </div>
          </div>
          <div className="container addedItems">
            <ul className="mx-auto pl-0">
              {cartItems
                ? cartItems.map(item => {
                    const { _id, name, quantity } = item;
                    return (
                      <div key={_id} className="listItem">
                        <li>
                          {name}
                          <span className="quantity float-right ">
                            {quantity}
                            <i className="fas fa-minus ml-2" />
                            <i
                              className="fas fa-plus ml-2"
                              onClick={() => this.onPlus(_id, name, quantity)}
                            />
                            <i className="fas fa-trash mx-2" />
                          </span>
                        </li>
                        <hr className="my-2" />
                      </div>
                    );
                  })
                : null}
            </ul>
            <button className="proceed btn btn-sm bg-success text-white mb-3">
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
