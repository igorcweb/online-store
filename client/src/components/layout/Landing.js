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
      <div className="landing" id="home-section">
        <div className="overlay">
          <div className="home-inner">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4">
                  <div className="img-wrap-overlap d-none d-lg-block">
                    <img
                      className=""
                      src="../assets/images/organic.jpg "
                      alt="#"
                    />
                    <div className="img-caption">
                      <h5>Organic Fabrics</h5>
                      <h1>Look good & feel good</h1>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="img-wrap pl-5">
                    <img
                      className="img-fluid float-right"
                      src="../assets/images/clothingface.jpg"
                      alt="#"
                    />
                    <div className="img-caption-2">
                      <Link to="/clothing">
                        {' '}
                        <h3>Shop Clothing</h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container text-center light-gray mt-2 pt-2">
                <h3 className="text-head dark-gray">
                  Take care of Yourself and the Planet
                </h3>
                <p className="font-italic times">
                  Our mission is to make this world better.
                  <br />
                  All of our products come from Nature.
                </p>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="wrap-1-of-2 col-sm-12  col-md-8 col-lg-8 mt-5 pl-5">
                    <div className="">
                      <img
                        className="img-fluid"
                        src="../assets/images/facefarm.jpg "
                        alt="#"
                      />
                    </div>
                    <div className="img-caption-2">
                      <Link to="/groceries">
                        <h3 className="left-caption">Shop Groceries</h3>
                      </Link>
                    </div>
                  </div>
                  <div className="wrap-2-of-2 col-sm-12 col-md-4 col-lg-4 mt-5 px-0 py-0 pr-4">
                    <div className="">
                      <div className="">
                        <img
                          className="img-fluid pl-0 pr-2"
                          src="../assets/images/supplements1.jpg"
                          alt="#"
                        />
                      </div>
                      <div className="img-caption-2">
                        <Link to="/supplements">
                          {' '}
                          <h3>Shop Supplements</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid cards mt-5 pt-5">
                <div className="row">
                  <div className="col-sm-12 col-md-4 col-lg-4 d-flex card-feature card align-items-center px-5 text-center text-gray">
                    DRESS ORGANIC
                    <img
                      src="../assets/images/organic-01.png"
                      alt=""
                      className="w-25 py-5"
                    />
                    <p className="small-par text-gray">
                      Organic cotton is grown without the use of toxic
                      pesticides, fertilizers and GMO’s that are proven to harm
                      the environment, farmers, producers and the consumer.
                    </p>
                  </div>

                  <div className="col-sm-12 col-md-4 col-lg-4 d-flex card align-items-center card-feature px-5 text-center text-gray border-y">
                    EAT HEALTHIER
                    <img
                      src="../assets/images/organic-02.png"
                      alt=""
                      className="w-25 py-5"
                    />
                    <p className="small-par">
                      Organic farming in general features practices that strive
                      to cycle resources, promote ecological balance, and
                      conserve biodiversity.
                    </p>
                  </div>

                  <div className="col-sm-12 col-md-4 col-lg-4 d-flex card align-items-center px-5 card-feature text-center text-gray">
                    ENHACE YOUR DAY
                    <img
                      src="../assets/images/organic-03.png"
                      alt=""
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
              <div className="container text-center heading light-gray mt-5 py-5">
                <h3 className="text-head dark-gray">
                  We are more than a fitness Store
                </h3>
                <p className="font-italic times">
                  We believe in positively impacting communities,
                  <br />
                  health, and the enviroment.
                </p>
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
