import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { togglePrimeModal } from '../../actions/modalActions';
import {
  updateCartItems,
  updateCart,
  toggleCart
} from '../../actions/cartActions';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import API from '../../utils/API';

class Prime extends Component {
  toggle = () => {
    this.props.togglePrimeModal();
  };

  onPrime = _id => {
    console.log(_id);
    API.signupForPrime(_id).then(res => console.log(res));
    setTimeout(() => {
      this.props.history.push('/');
    }, 1);
    this.props.togglePrimeModal();
  };

  render() {
    let primeContent;
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props;
      primeContent = (
        <div className="prime">
          <Modal
            isOpen={this.props.modal.primeModal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle} className="bg-gray">
              Prime Membership{' '}
            </ModalHeader>
            <ModalBody>
              {' '}
              <small>
                Becomming a Prime member pays for itself with exclusive savings
                on the things you need, the things you love, and all sorts of
                unexpected things.
              </small>
              <h6 className="mt-4">
                All <strong>Prime Members</strong> receive the following
                benefits:
              </h6>
              <div className="d-flex flex-row">
                <div className="pl-4 py-1 pr-1  align-self-start">
                  <i className="fa fa-check" />
                </div>
                <div className="p-1 align-self-end text-gray">
                  Extra offers on top of already low prices
                </div>
              </div>
              <div className="d-flex flex-row">
                <div className="pl-4 py-1 pr-1 align-self-start">
                  <i className="fa fa-check" />
                </div>
                <div className="p-1 align-self-end text-gray">
                  Free two-day shipping
                </div>
              </div>
              <p className="float-right">
                Anual Fee: <span className="text-danger">$59.99</span>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-darkbrown mt-4 btn btn-outline-light"
                onClick={this.toggle}
              >
                No Thanks
              </Button>
              <Button
                className="btn btn-success-custom  btn-block mt-4 py-2"
                onClick={() => this.onPrime(user._id)}
              >
                Start Prime Membership
              </Button>{' '}
            </ModalFooter>
            <div className="px-4 py-2">
              {' '}
              <small className="text-gray">
                By signing up, you authorize us to charge your default payment
                method on file. Your Prime membership continues until cancelled.
              </small>
            </div>
          </Modal>
        </div>
      );

      if (this.props.auth.isAuthenticated) {
        return <div className="prime">{primeContent}</div>;
      }
      return false;
    } else {
      return null;
    }
  }
}

Prime.propTypes = {
  auth: PropTypes.object.isRequired,
  togglePrimeModal: PropTypes.func.isRequired,
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
  { togglePrimeModal, updateCartItems, updateCart, toggleCart }
)(Prime);
