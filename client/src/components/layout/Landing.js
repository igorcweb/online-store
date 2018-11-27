import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="landing home-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="img-wrap-overlap d-none d-lg-block">
                <img
                  className=""
                  src="../assets/images/organic.jpg "
                  alt="organic fabrics"
                />
                <div className="img-caption">
                  <h5>Organic Fabrics</h5>
                  <h1>
                    Look good & feel go<span className="text-dark">od</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="img-wrap">
                <img
                  className="img-fluid float-right"
                  src="../assets/images/clothingface.jpg"
                  alt="shop clothing"
                />
                <div className="text-right">
                  <Link to="/clothing" className="underline-effect">
                    {' '}
                    <h3 className="mr-3">Shop Clothing</h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center mt-2 mb-5">
            <h3 className="heading">Take care of Yourself and the Planet</h3>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8 img-wrap">
              <img
                className="img-fluid groceries"
                src="../assets/images/facefarm.jpg "
                alt="groceries"
              />
              <div className="underline-effect text-left">
                <Link to="/groceries">
                  <h3 className="ml-3 facefarm">Shop Groceries</h3>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 right-div img-wrap mt-3">
              <img
                className="img-fluid supplements"
                src="../assets/images/supplements1.jpg"
                alt="supplements"
              />

              <div className="underline-effect text-right">
                <Link to="/supplements">
                  {' '}
                  <h3 className="mr-3">Shop Supplements</h3>
                </Link>
              </div>
            </div>
          </div>

          <div className="container mt-5 pt-2">
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4 d-flex card align-items-center px-5 text-center bg-gray">
                WEAR ORGANIC
                <img
                  src="../assets/images/organic-01.png"
                  alt="wear organic"
                  className="w-25 py-5"
                />
                <p className="small-par">
                  Organic cotton is grown without the use of toxic pesticides,
                  fertilizers and GMO’s that are proven to harm the environment,
                  farmers, producers and the consumer.
                </p>
              </div>

              <div className="col-sm-12 col-md-4 col-lg-4 d-flex card card-bottom align-items-center px-5 text-center border-y">
                EAT HEALTHY
                <img
                  src="../assets/images/organic-02.png"
                  alt="eat healthy"
                  className="w-25 py-5"
                />
                <p className="small-par">
                  Organic farming features practices that strive to cycle
                  resources, promote ecological balance, and conserve
                  biodiversity.
                </p>
              </div>

              <div className="col-sm-12 col-md-4 col-lg-4 d-flex card align-items-center px-5 text-center bg-gray">
                ENHACE YOUR LIFE
                <img
                  src="../assets/images/organic-03.png"
                  alt="enhance your life"
                  className="w-25 py-5"
                />
                <p className="small-par">
                  Certified organic dietary supplements provide nutrients in
                  their most natural form, which means they are the most
                  biologically active and beneficial they can be.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-5 py-3">
            <h3 className="heading">We are more than a fitness Store</h3>
            <p className="py-3 light-gray font-italic times mx-auto sm-width">
              We believe in positively impacting our community and the
              environment.
            </p>
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
