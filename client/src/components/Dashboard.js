import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import Spinner from './Spinner';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    } else {
      const { id } = this.props.auth.user;
      this.props.getCurrentUser(id);
    }
  }
  render() {
    const { user } = this.props;
    console.log(user);
    let dashboardContent;
    let primeMessage;
    let orderMessage;
    if (!user.name) {
      dashboardContent = <Spinner />;
    } else {
      const { name, date, prime } = user;
      if (prime.member) {
        primeMessage = (
          <h3 className="lead text-muted">
            As a prime member, you get free shipping on all U.S. orders! <br />
            Your next prime membership payment of ${prime.fee} is due on{' '}
            {prime.nextPayment}.
          </h3>
        );
      } else {
        primeMessage = (
          <h3 className="lead text-muted">
            Get free U.S shipping! Become a prime member today for only $59.99 a
            year!
          </h3>
        );
      }
      if (user.orders.length) {
        orderMessage = (
          <h3 className="lead text-muted">Here are your resent orders:</h3>
        );
      } else {
        orderMessage = '';
      }
      dashboardContent = (
        <div>
          <h3 className="lead text-muted">Welcome {name}!</h3>
          <h3 className="lead text-muted">Customer since {date}!</h3>
          {primeMessage}
          {orderMessage}
        </div>
      );
    }
    return <div className="dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Dashboard);
