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
            <div className="ordersList">
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
        <header id="home-section">
          <div className="dark-overlay my-5">
            <div className="home-inner">
              <div className="container">
                <header id="main-header">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-stretch text-center">
                          <div
                            className="port-item mr-1 mb-1 py-4 bg-white text-black"
                            data-toggle="collapse"
                            data-target="#profile"
                          >
                            <i className="fas fa-user-cog" />
                            <h4 className="d-inline ml-2">Profile</h4>
                          </div>
                          <div
                            className="port-item mb-1 py-4 bg-light text-primary"
                            data-toggle="collapse"
                            data-target="#orders"
                          >
                            <i className="fas fa-box" />
                            <h4 className="d-inline ml-2">Orders</h4>
                          </div>
                        </div>
                      </div>

                      <div id="profile" className="collapse px-5 show bg-white">
                        <div className="d-flex flex-column">
                          <div className="card my-5">
                            <div className="card-title py-4 success" />
                            <div className="card-body">{primeMessage}</div>{' '}
                          </div>
                        </div>

                        <div className="mt-3 collapse show" id="orders">
                          <form className="search-form-rt" />
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
              </div>
            </div>
          </div>
        </header>
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
