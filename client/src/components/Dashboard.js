import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { togglePrimeModal } from '../actions/modalActions';
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
  render() {
    const { user } = this.props;
    let dashboardContent;
    let primeMessage;
    let orderMessage;
    if (!user.name) {
      dashboardContent = <Spinner />;
    } else {
      const { name, date, prime, orders } = user;
      if (prime.member) {
        primeMessage = (
          <div className="my-4 pb-5">
            <div className="my-4 pb-5 divup">
              <i className="fas fa-certificate" />
              <h5 className="d-inline card-title ml-2">Prime Member</h5>
            </div>

            <p className="text-muted mt-3">
              As a prime member, you get free shipping on all U.S. orders!
            </p>
            <p className="text-muted mt-3">
              Your next prime membership payment of ${prime.fee} is due on{' '}
              {prime.nextPayment}.
            </p>
          </div>
        );
      } else {
        primeMessage = (
          <div className="my-4 pb-5">
            <div className="my-4 pb-5 divup">
              <i className="fas fa-certificate" />
              <h5 className="d-inline card-title ml-2">
                Become a Prime Member!
              </h5>
            </div>

            <p className="text-muted mt-3">
              Get free U.S shipping! Become a prime member today for only $59.99
              a year!
            </p>
            <button
              onClick={() => this.onPrime()}
              className="btn btn-block brown text-caps mt-4"
            >
              Become a Prime Member
            </button>
          </div>
        );
      }
      if (user.orders.length) {
        const uniqueOrders = removeDuplicates(orders, '_id');
        orderMessage = (
          <div className="orders">
            <h3 className="lead text-muted">Here are your resent purchases:</h3>
            <ul className="pl-0">
              {uniqueOrders.map((order, index) => {
                const { _id, name } = order;
                return <li key={_id + index}>{name}</li>;
              })}
            </ul>
          </div>
        );
      } else {
        orderMessage = '';
      }
      dashboardContent = (
        <div className="container-fluid mt-5 pt-2">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <i className="ml-4 fas fa-user" />
                  <h5 className="d-inline card-title ml-2">Welcome {name}!</h5>
                  <div className="card mt-4 mb-4 px-4 pt-3 pb-1">
                    <div className="content">{primeMessage}</div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="card mt-5 mb-5 px-4 pt-3 pb-1">
                    <div className="content">
                      <div className="my-4 pb-5 divup">
                        <i className="fas fa-box" />
                        <h5 className="d-inline card-title ml-2">Orders</h5>
                      </div>
                      {orderMessage}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="card mt-5 mb-5 px-4 pt-3 pb-1">
                    <div className="content">
                      <div className="my-4 pb-5 divup">
                        <i className="fas fa-user-cog" />
                        <h5 className="d-inline card-title ml-2">
                          {' '}
                          Customer Profile
                        </h5>
                      </div>
                      <h6 className="d-inline">Name:</h6> {name}
                      <h6 className="py-4">Address:</h6>
                      <small>Customer since {date}</small>
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
  togglePrimeModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser, togglePrimeModal }
)(Dashboard);
