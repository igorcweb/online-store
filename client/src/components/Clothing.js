import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';

class Clothing extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
  }

  render() {
    const { products } = this.props;
    const { user } = this.props.auth;
    console.log('clothing:', products);
    console.log(user);

    return (
      <div className="products">
        <h1>Clothing</h1>
      </div>
    );
  }
}

Clothing.propTypes = {
  auth: PropTypes.object.isRequired
};

Clothing.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProductsByCategory }
)(Clothing);
