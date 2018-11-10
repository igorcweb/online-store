import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toggleCheckoutModal } from '../../actions/modalActions';
import {
  updateCartItems,
  updateCart,
  toggleCart
} from '../../actions/cartActions';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

class Checkout extends Component {
  toggle = () => {
    this.props.toggleCheckoutModal();
  };

  onOrder = () => {
    localStorage.setItem('cartItems', 0);
    this.props.updateCartItems(localStorage.getItem('cartItems'));
    localStorage.setItem('cart', JSON.stringify([]));
    this.props.updateCart(JSON.parse(localStorage.getItem('cart')));
    this.props.toggleCart();
    this.props.toggleCheckoutModal();
  };

  render() {
    const order = this.props.cart.order;
    const { user } = this.props;
    let shipping;
    let shippingText;
    let checkoutContent;
    let tax;
    if (this.props.auth.isAuthenticated) {
      if (!user.name) {
        checkoutContent = <Spinner />;
      } else {
        shipping = ((this.props.cart.subtotal / 100) * 8 + 2.89).toFixed(2);
        shippingText = `$${shipping}`;
      }
      tax = ((this.props.cart.subtotal / 100) * 6.05).toFixed(2);
      checkoutContent = (
        <div className="checkout">
          <Modal
            isOpen={this.props.modal.checkoutModal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Checkout </ModalHeader>
            <ModalBody>
              <ul className="pl-0">
                {order.map(item => (
                  <li key={item._id}>
                    {item.name} - ${item.price}{' '}
                    <span className="float-right"> {item.quantity}</span>
                    <hr />
                  </li>
                ))}
                <li>Subtotal - ${this.props.cart.subtotal.toFixed(2)}</li>
                <li>Tax - ${tax}</li>
                <li>Shipping - {shippingText}</li>
                <hr />
                <li>
                  Total - $
                  {(
                    this.props.cart.subtotal +
                    parseFloat(tax) +
                    parseFloat(shipping)
                  ).toFixed(2)}
                </li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.onOrder}>
                Place Your Order
              </Button>{' '}
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    if (this.props.auth.isAuthenticated) {
      return <div className="checkout">{checkoutContent}</div>;
    }
    return false;
  }
}

Checkout.propTypes = {
  auth: PropTypes.object.isRequired,
  toggleCheckoutModal: PropTypes.func.isRequired,
  updateCartItems: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired
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
  { toggleCheckoutModal, updateCartItems, updateCart, toggleCart }
)(Checkout);
