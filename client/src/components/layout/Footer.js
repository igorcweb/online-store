import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    return (
      <div className="footer text-muted bg-white pt-3 pb-1">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()}
        </p>
      </div>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Footer);
