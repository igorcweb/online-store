import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toggleSizeModal } from '../../actions/modalActions';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Size extends Component {
  toggle = () => {
    this.props.toggleSizeModal();
  };

  render() {
    return (
      <Modal
        className="modal-sm  modal-size text-center"
        isOpen={this.props.modal.sizeModal}
        toggle={this.toggle}
      >
        <ModalHeader>
          <i class="fas fa-exclamation-circle  mx-auto" />
        </ModalHeader>
        <ModalBody className="modalAlert-body light-gray ">
          Select a size to complete your order.
        </ModalBody>
        <ModalFooter className="bg-gray">
          <button class="btn btn-brown-custom btn-block" onClick={this.toggle}>
            Ok
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

Size.propTypes = {
  toggleSizeModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { toggleSizeModal }
)(Size);
