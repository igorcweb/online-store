import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { togglePrimeModal, toggleAddressModal } from '../actions/modalActions';
import Spinner from './Spinner';
import { removeDuplicates } from '../utils/removeDuplicates';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    } else {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  onPrime = () => {
    this.props.togglePrimeModal();
    console.log('prime');
  };
  onUpdateAddress = () => {
    const checkout = false;
    this.props.toggleAddressModal(checkout);
  };
  render() {
    const { user } = this.props;
    let dashboardContent;
    let primeMessage;
    let orderMessage;
    let addressMessage;

    if (!user.name) {
      dashboardContent = <Spinner />;
    } else {
      const { name, email, date, prime, orders } = user;
      if (user.address) {
        const { street, city, state, zipcode } = user.address;
        addressMessage = (
          <div className="mt-4 py-2 bg-gray">
            <h6 className="text">Street Address:</h6>
            <h5 className="pb-2">{street}</h5>
            <h6 className="text">City:</h6>
            <h5 className="pb-2">{city}</h5>
            <h6 className="text">State:</h6>
            <h5 className="pb-2">{state}</h5>
            <h6 className="text">ZipCode:</h6>
            <h5>{zipcode}</h5>
            <button
              onClick={this.onUpdateAddress}
              className="btn bt-block btn-success-custom text-caps mt-4"
            >
              <h6 className="btn-text pt-1">Update Address</h6>
            </button>
          </div>
        );
      } else {
        addressMessage = (
          <button
            onClick={this.onUpdateAddress}
            className="btn btn-block btn-outline-warning mt-4"
          >
            <h6 className="btn-text pt-1"> Add Address</h6>
          </button>
        );
      }
      if (prime.member) {
        primeMessage = (
          <div className="my-3">
            <div className="my-4 pb-2 divup">
              <h5 className="card-title ml-2">Prime Member</h5>
            </div>

            <div className="my-4 px-3 py-5 bg-gray">
              <i className="fas fa-certificate" />
              <h5 className="my-5">
                As a prime member, you get free shipping on all U.S. orders!
              </h5>

              <small>
                {' '}
                Your next prime membership payment of ${prime.fee} is due on{' '}
                {prime.nextPayment}.
              </small>
            </div>
          </div>
        );
      } else {
        primeMessage = (
          <div className="my-4 pb-5">
            <div className="my-4 pb-3 divup">
              <i className="fas fa-award" />
              <h5 className="d-inline card-title ml-2">
                {' '}
                Become a Prime Member!
              </h5>
            </div>

            <div className="my-2 px-3 py-5 bg-gray">
              <h5 className="my-5">
                Get free U.S shipping! Become a prime member today for only
                $59.99 a year!
              </h5>

              <button
                onClick={() => this.onPrime()}
                className="btn btn-block btn-brown-custom mt-4"
              >
                <h6 className="btn-text pt-1"> Become a Prime Member</h6>
              </button>
            </div>
          </div>
        );
      }
      if (user.orders.length) {
        const uniqueOrders = removeDuplicates(orders, '_id');
        orderMessage = (
          <div className="orders">
            <div className="divup py-3 mb-5 text-center">
              <h5>Resent purchases:</h5>
            </div>

            <div>
              {uniqueOrders.map((order, index) => {
                const { _id, name, brand, imgUrl } = order;
                console.log(brand, imgUrl);
                return (
                  <div key={_id + index} className="d-flex flex-row">
                    <div className="div-modal-img mr-2">
                      <img src={imgUrl} alt={name} />
                    </div>
                    <div className="align-self-end">
                      <small className="text-muted">{brand}</small>
                      <h6> {name}</h6>
                    </div>
                  </div>
                  // return <li key={_id + index}>{name}</li>;
                );
              })}
            </div>
          </div>
        );
      } else {
        orderMessage = '';
      }
      dashboardContent = (
        <div className="container-fluid mt-5 pt-2">
          <div className="row">
            <div className="col-md-12">
              <i className="ml-4 fas fa-user" />
              <h5 className="d-inline card-title ml-2">Welcome {name}!</h5>
              <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                  <div className="card my-5">
                    <div className="content">
                      <div className="card-title py-4 success">
                        <i className="fas fa-user-cog" />
                        <h5 className="d-inline card-title ml-2">
                          {' '}
                          Membership
                        </h5>
                      </div>
                      <div className="card-body">{primeMessage}</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="card my-5">
                    <div className="content">
                      <div className="card-title py-4 success text-center">
                        <i className="fas fa-box" />
                        <h5 className="d-inline card-title ml-2">Orders</h5>
                      </div>

                      <div className="card-body">{orderMessage}</div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                  <div className="card my-5">
                    <div className="content">
                      <div className="card-title py-4 success">
                        <i className="fas fa-user-cog" />
                        <h5 className="d-inline card-title ml-2">
                          {' '}
                          Customer Profile
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="pb-5">
                          <div className="pb-3 divup">
                            <h4>{name}</h4>
                            <small> Customer since {date}</small>
                          </div>
                        </div>
                        <small>Email:</small>
                        <small className="text-muted"> {email}</small>
                        {addressMessage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="dashboard content">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  togglePrimeModal: PropTypes.func.isRequired,
  toggleAddressModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser, togglePrimeModal, toggleAddressModal }
)(Dashboard);
