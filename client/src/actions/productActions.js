import API from '../utils/API';

import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS } from './types';

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
