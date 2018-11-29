import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems } from '../actions/cartActions';
import ReactStars from 'react-stars';
import classnames from 'classnames';

class Clothing extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  state = {
    description: ''
  };

  seeMore = _id => {
    this.state.description === _id
      ? this.setState({ description: '' })
      : this.setState({ description: _id });
  };

  addToCart = (_id, name, brand, description, imgUrl, price) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = {
      _id,
      name,
      brand,
      description,
      imgUrl,
      price,
      quantity: 1
    };
    if (cart.length) {
      cart.forEach(stored => {
        if (stored._id === item._id) {
          stored.quantity += 1;
          item.quantity += 1;
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
              rating
            } = product;
            return (
              <div className="col-md col-lg-4 mt-2 mb-4 mx-auto" key={_id}>
                <div className="card align-items-center products d-flex shadow-sm">
                  <button
                    className="btn btn-success-custom-small ml-auto mb-5"
                    onClick={() =>
                      this.addToCart(
                        _id,
                        name,
                        brand,
                        description,
                        imgUrl,
                        price
                      )
                    }
                  >
                    <i className="fas fa-plus mr-2" />
                    Add to cart
                  </button>
                  <img src={imgUrl} alt={name} className="CardImg" />

                  <div className="card-body text-center">
                    <h6 className="name mb-1">{name}</h6>
                    <p className="brand my-1-muted text">{brand}</p>
                    <p className="orange strong my-2">${price.toFixed(2)}</p>
                    <ReactStars
                      className="className= stars d-flex justify-content-center"
                      count={5}
                      size={20}
                      color2={'#ffd700'}
                      value={rating.total / rating.number}
                      edit={false}
                    />
                    <button
                      className="btn btn-sm btn-outline-secondary d-block mx-auto  my-2"
                      onClick={() => this.seeMore(_id)}
                    >
                      {this.state.description === _id ? 'See Less' : 'See More'}
                    </button>
                    <small
                      className={classnames('text-gray isHidden', {
                        isShown: this.state.description === _id
                      })}
                    >
                      {' '}
                      <hr />
                      {description}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Clothing.propTypes = {
  auth: PropTypes.object.isRequired,
  getProductsByCategory: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getProductsByCategory, getCurrentUser, updateCartItems }
)(Clothing);
