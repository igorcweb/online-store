import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems } from '../actions/cartActions';

class Supplements extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

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
    console.log(this.props);
    return (
      <div className="products content">
        <div className="row">
          {products.map(product => {
            const { _id, name, brand, description, imgUrl, price } = product;
            return (
              <div className="col-md-4 my-5" key={_id}>
                <div className="card align-items-center d-flex">
                  <button
                    className="btn success ml-auto mb-5"
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
                  <img src={imgUrl} alt="" className="CardImg" />

                  <div className="card-body text-center">
                    <h6 className="name pb-2">{name}</h6>
                    <p className="orange strong">${price}</p>
                    <small className="text"> {description}</small>
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

Supplements.propTypes = {
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
)(Supplements);
