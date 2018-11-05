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

  render() {
    const { products } = this.props;
    const { user } = this.props;
    console.log('user:', user);
    console.log('groceries:', products);

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
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProductsByCategory, getCurrentUser }
)(Groceries);
