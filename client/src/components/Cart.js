import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import {
  updateCartItems,
  updateCart,
  toggleCart,
  getFinalOrder,
  getSubtotal
} from '../actions/cartActions';
import { toggleCheckoutModal } from '../actions/modalActions';
import classnames from 'classnames';
class Cart extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  onCheckout = subtotal => {
    const order = [];
    if (this.props.auth.isAuthenticated) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      cart.forEach(item => {
        if (item.quantity > 0) {
          order.push(item);
        }
      });
      this.props.getFinalOrder(order);
      this.props.getSubtotal(subtotal);
      this.props.toggleCheckoutModal();
    } else {
      this.props.toggleCart();
      this.props.history.push('/login');
    }
  };

  onPlus = (_id, cart, cartItems) => {
    const newCart = cart.map(item => {
      if (item._id === _id) {
        item.quantity++;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.props.updateCart(JSON.parse(localStorage.getItem('cart')));
    localStorage.setItem('cartItems', parseInt(cartItems) + 1);
    this.props.updateCartItems(localStorage.getItem('cartItems'));
  };
  onMinus = (_id, cart, cartItems) => {
    let newCart = cart.map(item => {
      if (item._id === _id) {
        item.quantity--;
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    this.props.updateCart(JSON.parse(localStorage.getItem('cart')));
    localStorage.setItem('cartItems', parseInt(cartItems) - 1);
    this.props.updateCartItems(localStorage.getItem('cartItems'));
    setTimeout(() => {
      if (this.props.cart.cartItems === '0') {
        this.props.toggleCart();
      }
    }, 1);
  };
  onTrash = (_id, cart, cartItems) => {
    let newCart = cart.map(item => {
      if (item._id === _id) {
        localStorage.setItem('cartItems', cartItems - item.quantity);
        item.quantity = 0;
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    this.props.updateCart(JSON.parse(localStorage.getItem('cart')));
    this.props.updateCartItems(localStorage.getItem('cartItems'));
    setTimeout(() => {
      if (this.props.cart.cartItems === '0') {
        this.props.toggleCart();
      }
    }, 1);
  };

  render() {
    // const { user } = this.props;
    // console.log('user:', user);
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItems = localStorage.getItem('cartItems');
    let subtotal;
    if (cart) {
      cart.forEach(item => {});
      subtotal = cart.reduce((acc, item) => {
        const price = item.quantity * item.price;
        return acc + price;
      }, 0);
    }

    const items = this.props.cart.cartItems === '1' ? 'Item' : 'Items';
    return (
      <div
        className={classnames(
          'card col-sm-12 cart card-border shadow-lg bg-gray rounded',
          {
            isShowing: this.props.cart.cartShowing
          }
        )}
      >
        {' '}
        <div className="card-title divup pt-3 pb-4">
          <h6 className="bold text-center text-dark d-inline cart-header">
            {this.props.cart.cartItems} {items} Selected
          </h6>
          <button
            type="button toggle-cart"
            className="close"
            aria-label="Close"
            onClick={this.props.toggleCart}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body p-0 m-0 no-gutters">
          <div className="container addedItems pl-0">
            <div className="mx-auto pl-0 ml-0">
              {cart
                ? cart.map(item => {
                    const { _id, name, brand, imgUrl, price, quantity } = item;
                    if (quantity > 0) {
                      return (
                        <div key={_id} className="d-flex flex-row divup pb-2">
                          <div className="pr-4 pt-2 div-modal-img">
                            <img src={imgUrl} alt="" />
                          </div>
                          <div className="align-self-end">
                            <small className="text-muted">{brand}</small>
                            <h6>
                              {name} - ${price}
                            </h6>

                            <p className="quantity text-muted mt-2">
                              Qty:
                              <span className="bg-white span-border ml-1 py-1 pr-2 pl-2">
                                {quantity}
                              </span>
                              <i
                                className="fas fa-minus ml-2"
                                onClick={() =>
                                  this.onMinus(_id, cart, cartItems)
                                }
                              />
                              <i
                                className="fas fa-plus ml-2"
                                onClick={() =>
                                  this.onPlus(_id, cart, cartItems)
                                }
                              />
                              <i
                                className="fas fa-trash mx-2"
                                onClick={() =>
                                  this.onTrash(_id, cart, cartItems)
                                }
                              />
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return false;
                  })
                : null}
            </div>
            <p className="card-title-subtext my-3 text-right">
              Subtotal: ${subtotal ? subtotal.toFixed(2) : '0.00'}
            </p>
            <button
              className="proceed btn success mt-5 pt-3 pb-2 text-dark btn-block"
              disabled={this.props.cart.cartItems === '0'}
              onClick={() => this.onCheckout(subtotal)}
            >
              <h6>PROCEED TO CHECKOUT</h6>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  updateCartItems: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
  toggleCheckoutModal: PropTypes.func.isRequired,
  getFinalOrder: PropTypes.func.isRequired,
  getSubtotal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user,
  cart: state.cart,
  subtotal: state.subtotal
});

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    updateCartItems,
    updateCart,
    toggleCart,
    toggleCheckoutModal,
    getFinalOrder,
    getSubtotal
  }
)(Cart);
