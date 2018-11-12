import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toggleAddressModal } from '../../actions/modalActions';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import API from '../../utils/API';

class Address extends Component {
  toggle = () => {
    this.props.toggleAddressModal();
  };

  render() {
    let primeContent;
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props;
      primeContent = (
        <div className="prime">
          <Modal isOpen={this.props.modal.addressModal} toggle={this.toggle}>
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

Address.propTypes = {
  auth: PropTypes.object.isRequired,
  toggleAddressModal: PropTypes.func.isRequired
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
  { toggleAddressModal }
)(Address);
