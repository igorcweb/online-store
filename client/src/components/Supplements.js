import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';
import { getCurrentUser } from '../actions/userActions';

class Supplements extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  render() {
    const { products } = this.props;
    const { user } = this.props;
    console.log('user:', user);
    console.log('supplements:', products);

    return (
      <ul className="products">
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
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
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProductsByCategory, getCurrentUser }
)(Supplements);
