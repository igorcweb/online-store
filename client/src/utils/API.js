import axios from 'axios';

export default {
  registerUser: userData => axios.post('/api/users/register', userData),
  loginUser: userData => axios.post('/api/users/login', userData),
  getUser: id => axios.get('/api/users/' + id),
  signupForPrime: id => axios.put('/api/users/prime/' + id),
  placeOrder: id => axios.put('/api/users/order/' + id),
  getProduct: id => axios.get('/api/products/' + id),
  rateProdict: id => axios.post('/api/users/rating/' + id),
  getUserRatings: id => axios.get('/api/users/rating/' + id),
  getProductRatings: id => axios.get('/api/users/product-rating' + id),
  getProducts: () => axios.get('/api/products'),
  getProductsByCategory: category => axios.get('/api/products/' + category)
};
