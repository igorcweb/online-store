import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { togglePrimeModal, toggleAddressModal } from '../actions/modalActions';
import Spinner from './Spinner';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems } from '../actions/cartActions';
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
      if (rating > 0) {
        API.rateProduct(id, { rating })
          .then(() => {
            this.props.history.push('/');
          })
          .catch(err => console.log(err));
      }
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

  addToCart = (_id, name, brand, description, imgUrl, price, inStock) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = {
      _id,
      name,
      brand,
      description,
      imgUrl,
      price,
      inStock,
      quantity: 1
    };
    if (cart.length) {
      cart.forEach(stored => {
        if (stored._id === item._id) {
          if (stored.quantity !== inStock) {
            stored.quantity += 1;
            item.quantity += 1;
          }
        }
      });
    }

    cart.push(item);
    //Remove duplicates
    const newCart = removeDuplicates(cart, '_id');
    const cartItems = newCart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    localStorage.setItem('cartItems', cartItems);
    this.props.updateCartItems(cartItems);
    const serializedCart = JSON.stringify(newCart);
    localStorage.setItem('cart', serializedCart);
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
      const { date, prime, orders } = user;
      if (user.address) {
        const { street, city, state, zipcode } = user.address;
        addressMessage = (
          <div className="address-msg text-center">
            <h5 className="heading-address mb-1">
              <i className="fas fa-address-book mr-2" />
              Shipping Address
            </h5>
            <p className="address-subtext my-0">{street}</p>
            <p className="address-subtext mt-0 mb-2">
              {city} {state}, {zipcode}
            </p>

            <button
              onClick={this.onUpdateAddress}
              className="btn btn-brown-custom btn-sm btn-address mt-1"
            >
              Update Address
            </button>
          </div>
        );
      } else {
        addressMessage = (
          <div className="address-msg text-center">
            <h5 className="heading-address mb-2">
              <i className="fas fa-address-book mr-2" />
              Shipping Address
            </h5>
            <button
              onClick={this.onUpdateAddress}
              className="btn btn-brown-custom btn-sm btn-address mt-2"
            >
              Add Address
            </button>
          </div>
        );
      }
      if (prime.member) {
        primeMessage = (
          <div className="mt-0 pt-0 text-center prime">
            <h4 className="heading-prime mb-1">
              <i className="fas fa-certificate mr-2"> </i>Prime Member
            </h4>

            <p className="subheading-prime mx-auto">
              {' '}
              Your next prime membership payment of ${prime.fee} is due on{' '}
              {prime.nextPayment}
            </p>
          </div>
        );
      } else {
        primeMessage = (
          <div className="mt-0 pt-0 text-center prime">
            <i className="fas fa-award" />
            <h5 className="d-inline card-title ml-2 prime-title mb-1">
              {' '}
              Become a Prime Member!
            </h5>

            <p className="subheading-prime mx-auto">
              Get free U.S shipping! Become a prime member for only $59.99 a
              year!
            </p>
            <div>
              <button
                onClick={this.onPrime}
                className="btn btn-brown-custom btn-prime"
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
          <div className="mb-5 purchases">
            {uniqueOrders.map(order => {
              const {
                _id,
                name,
                brand,
                description,
                imgUrl,
                price,
                rating,
                inStock
              } = order;
              return (
                <div key={_id}>
                  <div
                    onClick={() => {
                      this.passId(_id);
                    }}
                    className="d-flex pb-1 pt-4 px-3 mb-4"
                  >
                    <div className="div-modal-img mr-5">
                      <img
                        src={imgUrl}
                        alt={name}
                        className="d-block mx-auto mb-2"
                      />
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
                        {inStock > 0 ? (
                          <button
                            onClick={() =>
                              this.addToCart(
                                _id,
                                name,
                                brand,
                                description,
                                imgUrl,
                                price,
                                inStock
                              )
                            }
                            className="btn btn-success-custom-small mt-3"
                          >
                            <i className="fas fa-plus mr-2" />
                            Order again
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary mt-3"
                            disabled={true}
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        );
      } else {
        orderMessage = '';
      }
      dashboardContent = (
        <div className="container my-4">
          <div className="row account">
            <div className="col-xl-4 col-lg-5 col-md-6 offset-md-3 offset-lg-0 px-lg-0 mx-lg-0 welcome-message">
              <h4 className="heading-dashboard text-center text-lg-left mb-1">
                <i className="fas fa-user-alt mr-2" />
                Welcome {user.name}!
              </h4>
              <p className="text-center text-lg-left subheading">
                Member since {date}
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 offset-xl-0 offset-lg-0 prime-message mt-4 my-lg-0">
              {primeMessage}
            </div>
            <div className="col-xl-3 col-lg-3 mt-5 my-lg-0 ml-auto">
              {addressMessage}
            </div>
          </div>

          <div className="container purchases px-0 shadow-sm">
            <h5 className="heading-orders text-center mt-5 mb-0">
              <i className="fas fa-box mr-2" />
              Order History
            </h5>
            <div className="orders mt-0">
              <div className="col-sm-12">{orderMessage}</div>
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
  toggleAddressModal: PropTypes.func.isRequired,
  updateCartItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCurrentUser, togglePrimeModal, toggleAddressModal, updateCartItems }
)(Dashboard);
