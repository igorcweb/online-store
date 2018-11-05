import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByCategory } from '../actions/productActions';

class Supplements extends Component {
  componentDidMount() {
    const category = this.props.location.pathname.replace('/', '');
    this.props.getProductsByCategory(category);
  }

  render() {
    const { products } = this.props;
    const { user } = this.props.auth;
    console.log('supplements:', products);
    console.log(user);

    return (
      <div className="products">
        <h1>Supplements</h1>
      </div>
    );
  }
}

Supplements.propTypes = {
  auth: PropTypes.object.isRequired
};

Supplements.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProductsByCategory }
)(Supplements);
