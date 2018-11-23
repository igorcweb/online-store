import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Address from './modals/Address';
import { getCurrentUser } from '../actions/userActions';
import {
  updateCartItems,
  updateCart,
  toggleCart,
  getFinalOrder,
  getSubtotal
} from '../actions/cartActions';
import {
  toggleCheckoutModal,
  toggleAddressModal
} from '../actions/modalActions';
import classnames from 'classnames';
import API from '../utils/API';
// import API from '../utils/API';

class Cart extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  onCheckout = subtotal => {
    console.log('onCheckout');
    if (!this.props.auth.isAuthenticated) {
      this.props.toggleCart();
      this.props.history.push('/login');
    } else {
      const { id } = this.props.auth.user;
      console.log(id);
      API.getUser(id).then(response => {
        if (!response.data.address) {
          const checkout = true;
          this.props.toggleAddressModal(checkout);
        } else {
          const order = [];
          const cart = JSON.parse(localStorage.getItem('cart'));
          cart.forEach(item => {
            if (item.quantity > 0) {
              order.push(item);
            }
          });
          this.props.getFinalOrder(order);
          this.props.getSubtotal(subtotal);
          this.props.toggleCheckoutModal();
        }
      });
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
      subtotal = cart.reduce((acc, item) => {
        const price = item.quantity * item.price;
        return acc + price;
      }, 0);
    }

    const items = this.props.cart.cartItems === '1' ? 'Item' : 'Items';
    return (
      <React.Fragment>
        <Address
          subtotal={subtotal}
          onCheckout={() => this.onCheckout(subtotal)}
          history={this.props.history}
        />
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
          <div className="card-body px-0 mx-0">
            <div className="container pl-0">
              <div className="pl-0 ml-0 mb-1 pb-2 cart-content">
                {cart
                  ? cart.map(item => {
                      const { _id, name, brand, imgUrl, quantity } = item;
                      if (quantity > 0) {
                        return (
                          <div
                            key={_id}
                            className="d-flex flex-row divup pb-2 mb-2"
                          >
                            <div className="pr-4 pt-2 div-modal-img">
                              <img src={imgUrl} alt={name} />
                            </div>
                            <div className="align-self-end">
                              <small className="text-muted">{brand}</small>
                              <h6>{name}</h6>

                              <div className="quantity text-muted mt-2">
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
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return false;
                    })
                  : null}

                <p className="card-title-subtext mt-3 text-right">
                  Subtotal: ${subtotal ? subtotal.toFixed(2) : '0.00'}
                </p>
                <br />
                <button
                  className="btn proceed btn-success-custom  ml-2 pb-2 pt-2 btn-block"
                  disabled={this.props.cart.cartItems === '0'}
                  onClick={() => this.onCheckout(subtotal)}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
  toggleAddressModal: PropTypes.func.isRequired,
  getFinalOrder: PropTypes.func.isRequired,
  getSubtotal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user,
  cart: state.cart,
  modal: state.modal
});

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    updateCartItems,
    updateCart,
    toggleCart,
    toggleCheckoutModal,
    toggleAddressModal,
    getFinalOrder,
    getSubtotal
  }
)(Cart);
