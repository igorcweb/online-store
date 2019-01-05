import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { searchProducts } from '../actions/productActions';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems, toggleCart } from '../actions/cartActions';
import ReactStars from 'react-stars';
import classnames from 'classnames';

class Search extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
    const query = this.props.history.location.pathname
      .replace('/search/', '')
      .toLowerCase();
    this.props.searchProducts(query, this.props.history);
  }

  state = {
    description: ''
  };

  seeMore = _id => {
    this.state.description === _id
      ? this.setState({ description: '' })
      : this.setState({ description: _id });
  };

  addToCart = (_id, name, brand, description, imgUrl, price, inStock) => {
    if (!this.props.cart.cartShowing) {
      this.props.toggleCart();
    }
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
    const { products } = this.props;
    return (
      <div className="my-4 content mx-xl-5">
        <div className="row">
          {products.map(product => {
            const {
              _id,
              name,
              brand,
              description,
              imgUrl,
              price,
              rating,
              inStock
            } = product;
            return (
              <div className="col-md col-lg-4 mt-2 mb-4 mx-auto" key={_id}>
                <div className="card align-items-center products d-flex shadow-sm">
                  {inStock > 0 ? (
                    <button
                      className="btn btn-success-custom-small mb-5 d-block ml-auto"
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
                    >
                      <i className="fas fa-plus mr-2" />
                      Add to cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary d-block ml-auto mb-4"
                      disabled={true}
                    >
                      Out of Stock
                    </button>
                  )}
                  <div className="product-body">
                    <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={imgUrl}
                        alt={name}
                        className="CardImg mx-auto"
                      />
                    </a>

                    <div className="card-body text-center">
                      <h6 className="name mb-1">{name}</h6>
                      <p className="brand my-1 text-muted">{brand}</p>
                      <p className="orange strong my-2">${price.toFixed(2)}</p>
                      <ReactStars
                        className="className= stars d-flex justify-content-center"
                        count={5}
                        size={20}
                        color2={'#ffd700'}
                        value={rating.total / rating.number}
                        edit={false}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-secondary d-block mx-auto my-2"
                    onClick={() => this.seeMore(_id)}
                  >
                    {this.state.description === _id ? 'See Less' : 'See More'}
                  </button>
                  <small
                    className={classnames('text-gray isHidden px-4 pb-2', {
                      isShown: this.state.description === _id
                    })}
                  >
                    {' '}
                    <hr />
                    {description}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCurrentUser, searchProducts, updateCartItems, toggleCart }
)(Search);
