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

  onPlus = (_id, name, quantity, cart, cartItems) => {
    const newCart = cart.map(item => {
      if (item._id === _id) {
        item.quantity++;
      }
      return cart;
    });
    // localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('cartItems', parseInt(cartItems) + 1);
    this.props.updateCartItems(localStorage.getItem('cartItems'));
    console.log(_id, name, quantity, cart);
    console.log(newCart);
  };
  onMinus = (_id, name, quantity, cart) => {
    console.log(_id, name, quantity, cart);
  };
  onTrash = (_id, name, quantity, cart) => {
    console.log(_id, name, quantity, cart);
  };

  render() {
    // const { user } = this.props;
    // console.log('user:', user);
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItems = localStorage.getItem('cartItems');
    let subtotal;
    if (cart) {
      subtotal = cart.reduce((acc, item) => {
        const price = item.quantity * item.price;
        return acc + price;
      }, 0);
    }
    console.log(this.props.cart.cartItems);
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
                {this.props.cart.cartItems} Items Selected
              </h5>
              <h6 className="card-title-subtext mb-0 text-center">
                Subtotal: ${subtotal ? subtotal.toFixed(2) : '0.00'}
              </h6>
            </div>
          </div>
          <div className="container addedItems pl-0">
            <ul className="mx-auto pl-0 ml-0">
              {cart
                ? cart.map(item => {
                    const { _id, name, quantity } = item;
                    return (
                      <div key={_id} className="listItem">
                        <li>
                          {name}
                          <span className="quantity float-right ">
                            {quantity}
                            <i
                              className="fas fa-minus ml-2"
                              onClick={() =>
                                this.onMinus(
                                  _id,
                                  name,
                                  quantity,
                                  cart,
                                  cartItems
                                )
                              }
                            />
                            <i
                              className="fas fa-plus ml-2"
                              onClick={() =>
                                this.onPlus(
                                  _id,
                                  name,
                                  quantity,
                                  cart,
                                  cartItems
                                )
                              }
                            />
                            <i
                              className="fas fa-trash mx-2"
                              onClick={() =>
                                this.onTrash(
                                  _id,
                                  name,
                                  quantity,
                                  cart,
                                  cartItems
                                )
                              }
                            />
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
