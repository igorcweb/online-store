import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    return (
      <div className="footer text-muted bg-white fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="py-4">
                <p>Copyright &copy; {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
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
