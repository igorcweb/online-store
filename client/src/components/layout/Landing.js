import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing" id="home-section">
        <div className="overlay">
          <div className="home-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="img-wrap-2">
                    <img
                      className="img-fluid"
                      src="../assets/images/organic.jpg "
                      alt="#"
                    />
                    <div className="img-caption">
                      <h3>We care about the World</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="img-wrap">
                    <img
                      className="img-fluid"
                      src="../assets/images/clothingface.jpg"
                      alt="#"
                    />
                    <div className="img-caption-2">
                      <h3>Shop Clothing</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
