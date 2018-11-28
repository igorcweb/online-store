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
          <div className="">
            <p className="">
              {street}, {city} {state}, {zipcode}
            </p>

            <button
              onClick={this.onUpdateAddress}
              className="btn bt-block btn-success-custom text-caps"
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
          <div className="mt-0 pt-0 text-center mt-3 ">
            <div className="p-2 thisj">
              <i className="fas mt-2 fa-certificate"> Prime Member</i>
            </div>
            <div className="">
              <small className="">
                {' '}
                Your next prime membership payment of ${prime.fee} is due on{' '}
                {prime.nextPayment}.
              </small>
            </div>
          </div>
        );
      } else {
        primeMessage = (
          <div className="mt-0 pt-0 text-center mt-3 ">
            <div className="p-2 thisj">
              <i className="fas fa-award" />
              <h5 className="d-inline card-title ml-2">
                {' '}
                Become a Prime Member!
              </h5>
            </div>
            <div className="">
              <small className="">
                Get free U.S shipping! Become a prime member today for only
                $59.99 a year!
              </small>

              <button
                onClick={this.onPrime}
                className="btn btn-brown-custom mt-4"
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
          <div className="orders py-3">
            <div className="pt-3 mt-3 mb-5 text-center">
              <h5>Resent purchases:</h5>
            </div>
            <div className="mb-5">
              {uniqueOrders.map(order => {
                const { _id, name, brand, imgUrl, rating } = order;
                return (
                  <div
                    key={_id}
                    onClick={() => {
                      this.passId(_id);
                    }}
                    className="d-flex flex-row border pb-4 pt-4 px-3 mb-4"
                  >
                    <div className="div-modal-img mr-5">
                      <img src={imgUrl} alt={name} />
                      <ReactStars
                        className="className= stars d-flex justify-content-center"
                        passId={_id}
                        count={5}
                        size={20}
                        color2={'#ffd700'}
                        value={rating.total / rating.number}
                        onChange={this.ratingChanged}
                      />
                    </div>
                    <div>
                      <h6 className="pb-0 mb-0">{name}</h6>
                      <small className="text-muted pt-0 mt-0">{brand}</small>
                      <div>
                        <button className="btn btn-light bg-warning mt-3">
                          Order again
                        </button>
                      </div>
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
        <div className="container my-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex ">
                <div className="d-flex flex-row my-3">
                  <i className="fas fa-user-alt mr-3" />
                  <div>
                    <h4 className="bold heading-toggle">DASHBOARD</h4>
                  </div>

                  <div className="toggle-nav mt-4 pt-2">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-item nav-link active"
                          id="nav-profile-tab"
                          data-toggle="tab"
                          href="#nav-profile"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="true"
                        >
                          Profile
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="nav-orders-tab"
                          data-toggle="tab"
                          href="#nav-orders"
                          role="tab"
                          aria-controls="nav-orders"
                          aria-selected="false"
                        >
                          Orders
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="tab-content mt-4 " id="nav-tabContent">
                <div
                  className="tab-pane p-5 show bg-white border fade show active"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="d-flex flex-column">
                    <div className="card my-4">
                      <div className="card-body mt-0 pt-0">
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-9 mt-1 text-center mb-3">
                            <table className="table mt-5">
                              <thead className="no-border">
                                <tr>
                                  <th scope="col" className="pt-3 pb-0">
                                    <p className="small-heading-1">Name</p>
                                  </th>
                                  <th scope="col" className="pt-3 pb-0">
                                    <p className="small-heading-1">Email</p>
                                  </th>
                                  <th scope="col" className="pt-3 pb-0">
                                    <p className="small-heading-1">
                                      Shipping Address
                                    </p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="border">
                                <tr className="firstly">
                                  <td className="">
                                    <h6>{name}</h6>
                                    <small>Member since {date}</small>
                                  </td>
                                  <td className="">
                                    <small>{email}</small>
                                  </td>

                                  <td>
                                    <small>{addressMessage}</small>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-3">
                            {primeMessage}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane collapse border px-5 bg-white fade"
                  id="nav-orders"
                  role="tabpanel"
                  aria-labelledby="nav-orders-tab"
                >
                  <div className="col-sm-12">{orderMessage}</div>
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
