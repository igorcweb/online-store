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
      .then(() => {
        API.sendOrder(_id, { products }).then(() => {});
        this.props.history.push('/loading');
        setTimeout(() => this.props.history.push('/dashboard'), 20);
      })
      .catch(err => console.log(err));
    localStorage.setItem('cartItems', 0);
    this.props.updateCartItems(localStorage.getItem('cartItems'));
    localStorage.setItem('cart', JSON.stringify([]));
    this.props.updateCart(JSON.parse(localStorage.getItem('cart')));
    this.props.toggleCart();
    this.props.toggleCheckoutModal();
  };

  onCancel = () => {
    const pathname = this.props.history.location.pathname;
    this.toggle();
    this.props.history.push('/loading');
    setTimeout(() => {
      this.props.history.push(pathname);
    }, 10);
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
              ORDER SUMMARY
            </ModalHeader>
            <ModalBody>
              <table className="table">
                <thead>
                  <tr className="tex-white">
                    <th
                      scope="col"
                      className="  bg-darkgray border-white text-center pt-3 pb-0"
                    >
                      <p className="small-heading"> Item</p>
                    </th>
                    <th
                      scope="col"
                      className="bg-darkgray border-white text-center pt-3 pb-0"
                    >
                      <p className="small-heading"> Qty</p>
                    </th>
                    <th
                      scope="col"
                      className="bg-darkgray border-white text-center pt-3 pb-0"
                    >
                      <p className="small-heading"> Price</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.map(item => (
                    <tr key={item._id} className="table">
                      <td className="text-center dark-gray medium-height">
                        <small>{item.name}</small>
                      </td>
                      <td className="text-center dark-gray medium-heigh">
                        <small>{item.quantity}</small>
                      </td>
                      <td className="text-center dark-gray medium-heigh">
                        <small>${item.price}</small>
                      </td>
                    </tr>
                  ))}
                  <tr />
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter className="bg-gray ml-0">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="ml-0 pl-0">
                      <li className="dark-gray font-small">
                        Subtotal{' '}
                        <span className="float-right">
                          ${this.props.cart.subtotal.toFixed(2)}
                        </span>
                      </li>
                      <li className="dark-gray font-small ">
                        Tax <span className="float-right">${tax}</span>
                      </li>
                      <li className="dark-gray font-small">
                        Shipping{' '}
                        <span className="float-right">{shippingText}</span>
                      </li>
                      <hr />
                      <li className="mb-3 ">
                        <h5 className="d-inline bold-light-black mt-0 pt-0">
                          Total
                        </h5>
                        <span className="float-right bold-light-black">
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
                  <div className="col-sm-12">
                    <Button
                      className="btn-custom ml-2 px-4 btn-success-custom float-right py-1"
                      onClick={() => this.onOrder()}
                    >
                      Place Your Order
                    </Button>
                    <Button
                      className="btn-red btn-custom float-right py-1"
                      onClick={this.onCancel}
                    >
                      Cancel
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
