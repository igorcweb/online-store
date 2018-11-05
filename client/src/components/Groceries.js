import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';

class Groceries extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
  }

  render() {
    const { products } = this.props;
    const { user } = this.props.auth;
    console.log('groceries:', products);
    console.log(user);
    return (
      <div className="products">
        <h1>Groceries</h1>
      </div>
    );
  }
}

Groceries.propTypes = {
  auth: PropTypes.object.isRequired
};

Groceries.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProductsByCategory }
)(Groceries);
