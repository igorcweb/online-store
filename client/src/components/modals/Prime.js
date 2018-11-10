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
      console.log(user);
      primeContent = (
        <div className="prime">
          <Modal
            isOpen={this.props.modal.primeModal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Prime Membership </ModalHeader>
            <ModalBody>
              <p>Anual Fee: $59.99</p>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => this.onPrime(user._id)}>
                Become a Prime Member
              </Button>{' '}
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );

      if (this.props.auth.isAuthenticated) {
        console.log(this.props);
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
