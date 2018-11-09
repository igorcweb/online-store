import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems } from '../actions/cartActions';

class Clothing extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }
  addToCart = (_id, name, description, price) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    const item = {
      _id,
      name,
      description,
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
    console.log(newCart);
    const cartItems = newCart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    localStorage.setItem('cartItems', cartItems);
    console.log(cartItems);
    this.props.updateCartItems(cartItems);
    const serializedCart = JSON.stringify(newCart);
    localStorage.setItem('cart', serializedCart);
    console.log(('local storage', localStorage));
  };
  render() {
    const { products, user } = this.props;
    console.log('user:', user);
    console.log('groceries:', products);
    return (
      <div className="products">
        <div className="row">
          {products.map(product => {
            const { _id, name, description, imgUrl, price } = product;
            return (
              <div className="col-md-4 my-5" key={_id}>
                <div className="card align-items-center d-flex">
                  <button
                    className="btn success ml-auto mb-5"
                    onClick={() =>
                      this.addToCart(_id, name, description, price)
                    }
                  >
                    <i class="fas fa-plus mr-2" />
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
