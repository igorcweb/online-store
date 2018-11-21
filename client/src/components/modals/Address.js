import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  toggleAddressModal,
  toggleCheckoutModal
} from '../../actions/modalActions';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import API from '../../utils/API';

class Address extends Component {
  state = {
    street: '',
    city: '',
    $state: '',
    zipcode: '',
    errors: {}
  };
  toggle = () => {
    this.props.toggleAddressModal();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const checkout = this.props.modal.checkout;
    const id = this.props.auth.user.id;
    const address = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.$state,
      zipcode: this.state.zipcode
    };
    API.addAddress(id, address)
      .then(() => {
        if (!this.props.modal.checkout) {
          this.props.toggleAddressModal(checkout);
          this.props.history.push('/loading');
          setTimeout(() => this.props.history.push('/dashboard'), 20);
        } else {
          this.props.onCheckout(this.props.subtotal);
          this.props.toggleAddressModal();
        }
      })

      .catch(err => console.log(err));
  };

  render() {
    const { errors } = this.state;
    let addressForm;
    if (this.props.auth.isAuthenticated) {
      addressForm = (
        <div className="address">
          <Modal isOpen={this.props.modal.addressModal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} className="bg-gray">
              <i className="ml-4 mr-2 fas fa-address-book" />
              Shipping Address
            </ModalHeader>
            <ModalBody>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="street" className="label">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.street
                      })}
                      name="street"
                      value={this.state.street}
                      onChange={this.onChange}
                    />
                    {errors.street && (
                      <div className="invalid-feedback">{errors.street}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className="label">
                      City
                    </label>
                    <input
                      type="text"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.city
                      })}
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="$state" className="label">
                      State
                    </label>
                    <select
                      className="form-control form-control-lg"
                      name="$state"
                      value={this.state.$state}
                      onChange={this.onChange}
                    >
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipcode" className="label">
                      Zipcode
                    </label>
                    <input
                      type="text"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.zipcode
                      })}
                      name="zipcode"
                      maxLength="5"
                      value={this.state.zipcode}
                      onChange={this.onChange}
                    />
                    {errors.zipcode && (
                      <div className="invalid-feedback">{errors.zipcode}</div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-success-custom  btn-block mt-4 py-2"
                  />
                </form>
              </div>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </div>
      );

      if (this.props.auth.isAuthenticated) {
        // console.log(this.props.onCheckout);
        return <div className="address">{addressForm}</div>;
      }
      return false;
    } else {
      return null;
    }
  }
}

Address.propTypes = {
  auth: PropTypes.object.isRequired,
  toggleAddressModal: PropTypes.func.isRequired,
  toggleCheckoutModal: PropTypes.func.isRequired
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
  { toggleAddressModal, toggleCheckoutModal }
)(Address);
