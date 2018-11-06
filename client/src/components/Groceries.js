import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';
import { removeDuplicates } from '../utils/removeDuplicates';

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
    console.log(newCart);
    const serializedCart = JSON.stringify(newCart);
    localStorage.setItem('cart', serializedCart);
    console.log(('local storage', localStorage));
  };

  render() {
    const { products, user } = this.props;
    console.log('user:', user);
    console.log('groceries:', products);

    return (
      <ul className="products">
        {products.map(product => {
          const { _id, name, description, price } = product;
          return (
            <li key={product._id}>
              {product.name}
              {this.props.auth.isAuthenticated ? (
                <button
                  key={_id}
                  className="btn d-block"
                  onClick={() => this.addToCart(_id, name, description, price)}
                >
                  add
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
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
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProductsByCategory, getCurrentUser }
)(Groceries);
