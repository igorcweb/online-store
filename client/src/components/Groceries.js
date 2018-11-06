import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';

class Groceries extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  addToCart = (_id, name, price) => {
    // const { name, price } = e.target;
    console.log(_id, name, price);
  };

  render() {
    const { products } = this.props;
    const { user } = this.props;
    console.log('user:', user);
    console.log('groceries:', products);

    return (
      <ul className="products">
        {products.map(product => {
          const { _id, name, price } = product;
          return (
            <li key={product._id}>
              {product.name}
              {this.props.auth.isAuthenticated ? (
                <button
                  key={_id}
                  className="btn d-block"
                  onClick={() => this.addToCart(_id, name, price)}
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
