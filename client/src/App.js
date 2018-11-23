import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/layout/Footer';
import Groceries from './components/Groceries';
import Supplements from './components/Supplements';
import Clothing from './components/Clothing';
import Search from './components/Search';
import Cart from './components/Cart';
import Checkout from './components/modals/Checkout';
import Prime from './components/modals/Prime';
import Spinner from './components/Spinner';
import NoResults from './components/NoResults';
import './App.scss';

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.token);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set usere and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/" component={Navbar} />
            <Route path="/" component={Cart} />
            <Route path="/" component={Checkout} />
            <Route path="/" component={Prime} />
            <Route exact path="/" component={Landing} />
            <div className="container-fluid">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/groceries" component={Groceries} />
              <Route exact path="/supplements" component={Supplements} />
              <Route exact path="/clothing" component={Clothing} />
              <Route path="/search" component={Search} />
              <Route exact path="/loading" component={Spinner} />
              <Route exact path="/no-results" component={NoResults} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
