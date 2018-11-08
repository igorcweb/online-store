import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';
import { removeDuplicates } from '../utils/removeDuplicates';
import { updateCartItems } from '../actions/cartActions';

class Groceries extends Component {
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
    return (
      <div className="products">
        <div className="row">
          {products.map(product => {
            const { _id, name, description, imgUrl, price } = product;
            return (
              <div className="col-md-4" key={_id}>
                <div className="card shadow-sm align-items-center">
                  <img src={imgUrl} alt="" className="CardImg" />
                </div>
                <div className="card-body">
                  <h6 className="block2-name dis-block s-text3 p-b-5">
                    {name}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-secondary">
                        Read Description
                      </button>
                      <button
                        className="btn btn-sm btn-success ml-2"
                        onClick={() =>
                          this.addToCart(_id, name, description, price)
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                    <span className="block2-price m-text6 p-r-5">${price}</span>
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

Groceries.propTypes = {
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
)(Groceries);
