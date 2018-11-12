import axios from 'axios';

export default {
  registerUser: userData => axios.post('/api/users/register', userData),
  loginUser: userData => axios.post('/api/users/login', userData),
  getUser: id => axios.get('/api/users/' + id),
  signupForPrime: id => axios.put('/api/users/prime/' + id),
  placeOrder: (id, body) => axios.put('/api/users/order/' + id, body),
  addAddress: (id, body) => axios.put('/api/users/address/' + id, body),
  getProduct: id => axios.get('/api/products/' + id),
  rateProdict: id => axios.post('/api/users/rating/' + id),
  getUserRatings: id => axios.get('/api/users/rating/' + id),
  getProductRatings: id => axios.get('/api/users/product-rating' + id),
  getProducts: () => axios.get('/api/products'),
  getProductsByCategory: category => axios.get('/api/products/' + category),
  searchProducts: query => axios.get('/api/products/search/' + query)
};
