import API from '../utils/API';

import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS,
  SEARCH_PRODUCTS
} from './types';

//Get Products

export const getProductsByCategory = category => dispatch => {
  API.getProductsByCategory(category)
    .then(response =>
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};
export const getProducts = () => dispatch => {
  API.getProducts()
    .then(response =>
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};
export const searchProducts = (query, history) => dispatch => {
  API.searchProducts(query)
    .then(response => {
      if (response.data.length) {
        dispatch({
          type: SEARCH_PRODUCTS,
          payload: response.data
        });
      } else {
        history.push('/no-results');
      }
    })
    .catch(err => console.log(err));
};
