import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
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
          <Button color="secondary" onClick={this.toggle}>
            Ok
          </Button>
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
