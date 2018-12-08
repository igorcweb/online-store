import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
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
        <ModalBody className="modalAlert-body light-gray ">
          <p>
            <i className="fas fa-exclamation-circle mr-2" />
            Please select size
          </p>
        </ModalBody>
        <ModalFooter className="bg-gray">
          <button
            className="btn btn-sm btn-brown-custom btn-block"
            onClick={this.toggle}
          >
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
