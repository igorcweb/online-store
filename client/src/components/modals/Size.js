import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { toggleSizeModal } from '../../actions/modalActions';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Size extends Component {
  toggle = () => {
    this.props.toggleSizeModal();
  };

  render() {
    return (
      <Modal isOpen={this.props.modal.sizeModal} toggle={this.toggle}>
        <ModalHeader>Please select size.</ModalHeader>
        <ModalFooter>
          <button class="btn btn-success-custom-small" onClick={this.toggle}>
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
