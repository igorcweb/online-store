import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { togglePrimeModal, toggleAddressModal } from '../actions/modalActions';
import Spinner from './Spinner';
import { removeDuplicates } from '../utils/removeDuplicates';
import ReactStars from 'react-stars';
import API from '../utils/API';

class Dashboard extends Component {
  state = {
    rating: 0,
    id: ''
  };
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    } else {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  ratingChanged = newRating => {
    console.log(newRating);
    this.setState({
      rating: newRating
    });
  };
  passId = id => {
    this.setState({ id });
    this.rateProduct();
  };
  rateProduct = () => {
    const rate = () => {
      const { id, rating } = this.state;
      API.rateProduct(id, { rating })
        .then(() => {
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    };
    setTimeout(rate, 100);
  };
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
            <h6 className="text my-3">Shipping Address:</h6>
            <h6 className="pb-2">{street}</h6>
            <h6 className="pb-2 mt-0 pt-0">
              {city},{state} {zipcode}
            </h6>

            <button
              onClick={this.onUpdateAddress}
              className="btn bt-block btn-success-custom text-caps my-3"
            >
              Update Address
            </button>
          </div>
        );
      } else {
        addressMessage = (
          <button
            onClick={this.onUpdateAddress}
            className="btn btn-block btn-brown-custom mt-4"
          >
            Add Address
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
                onClick={this.onPrime}
                className="btn btn-block btn-brown-custom mt-4"
              >
                Become a Prime Member
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
              {uniqueOrders.map(order => {
                const { _id, name, brand, imgUrl, rating } = order;
                return (
                  <div
                    key={_id}
                    onClick={() => {
                      this.passId(_id);
                    }}
                    className="d-flex flex-row"
                  >
                    <div className="div-modal-img mr-2">
                      <img src={imgUrl} alt={name} />
                      <ReactStars
                        className="className= stars d-flex justify-content-center my-2"
                        passId={_id}
                        count={5}
                        size={20}
                        color2={'#ffd700'}
                        value={rating.total / rating.number}
                        onChange={this.ratingChanged}
                      />
                    </div>
                    <div className="align-self-end">
                      <small className="text-muted">{brand}</small>
                      <h6> {name}</h6>
                    </div>
                  </div>
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
                            <p>
                              {' '}
                              Customer since <br />
                              {date}
                            </p>
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
