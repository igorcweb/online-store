import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';

class Search extends Component {
  componentDidMount() {
    const query = this.props.history.location.pathname
      .replace('/search/', '')
      .toLowerCase();
    console.log(query);
    if (this.props.auth.isAuthenticated) {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }

  addToCart = (_id, name, price) => {
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

Search.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Search);
