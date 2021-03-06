import axios from 'axios';

export default {
  registerUser: userData => axios.post('/api/users/register', userData),
  loginUser: userData => axios.post('/api/users/login', userData),
  getUser: id => axios.get('/api/users/' + id),
  signupForPrime: id => axios.put('/api/users/prime/' + id),
  placeOrder: (id, body) => axios.put('/api/users/order/' + id, body),
  addAddress: (id, body) => axios.put('/api/users/address/' + id, body),
  getProduct: id => axios.get('/api/products/' + id),
  rateProduct: (name, body) => axios.put('/api/products/rating/' + name, body),
  getProducts: () => axios.get('/api/products'),
  getUniqueClothing: () => axios.get('/api/products/xs'),
  getProductsByCategory: category => axios.get('/api/products/' + category),
  getProductByNameSize: (name, size) =>
    axios.get('/api/products/' + name + '/' + size),
  searchProducts: query => axios.get('/api/products/search/' + query),
  sendWelcome: userData => axios.post('/api/send/welcome', userData),
  sendOrder: (id, body) => axios.post('/api/send/order/' + id, body)
};
