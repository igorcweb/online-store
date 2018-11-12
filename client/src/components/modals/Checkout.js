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
import API from '../../utils/API';

class Checkout extends Component {
  toggle = () => {
    this.props.toggleCheckoutModal();
  };

  onOrder = () => {
    const { _id } = this.props.user;
    console.log(_id);
    const { order } = this.props.cart;
    const products = [];
    order.forEach(product => {
      products.push([product._id, product.quantity]);
    });
    console.log(products);
    API.placeOrder(_id, { products })
      .then(response => {
        this.props.history.push('/loading');
        setTimeout(() => this.props.history.push('/dashboard'), 20);

        console.log(response);
      })
      .catch(err => console.log(err));
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
      } else if (user.prime.member) {
        shipping = 0;
        shippingText = `$0.00 (prime rate)`;
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
            <ModalHeader toggle={this.toggle} className="bg-gray">
              <h6>ORDER SUMMARY</h6>
            </ModalHeader>
            <ModalBody>
              <table className="table">
                <thead>
                  <tr className="tex-white bg-darkgray">
                    <th
                      scope="col"
                      className="bg-darkgray border-white text-center"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="bg-darkgray border-white text-center"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="bg-darkgray border-white text-center"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.map(item => (
                    <tr key={item._id} className="table">
                      <td className="text-center text-muted">{item.name}</td>
                      <td className="text-center text-muted">
                        {item.quantity}
                      </td>
                      <td className="text-center text-muted">${item.price}</td>
                    </tr>
                  ))}
                  <tr />
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter className="bg-gray ml-0 pl-0">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="ml-0 pl-0">
                      <li className="text-muted">
                        Subtotal{' '}
                        <span className="float-right">
                          ${this.props.cart.subtotal.toFixed(2)}
                        </span>
                      </li>
                      <li className="text-muted">
                        Tax <span className="float-right">${tax}</span>
                      </li>
                      <li className="text-muted">
                        Shipping{' '}
                        <span className="float-right">{shippingText}</span>
                      </li>
                      <hr />
                      <li className="mb-5">
                        <h4 className="d-inline">Total</h4>
                        <span className="float-right h5">
                          $
                          {(
                            this.props.cart.subtotal +
                            parseFloat(tax) +
                            parseFloat(shipping)
                          ).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-12 ">
                    <Button
                      className="ml-2 px-4 success float-right order-last"
                      onClick={() => this.onOrder()}
                    >
                      <h6 className="mt-1">Place Your Order</h6>
                    </Button>
                    <Button
                      className="btn-danger float-right"
                      onClick={this.toggle}
                    >
                      <h6 className="mt-1">Cancel</h6>
                    </Button>
                  </div>
                </div>
              </div>
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
