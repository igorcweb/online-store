import API from '../utils/API';

import { GET_CURRENT_USER } from './types';

export const getCurrentUser = id => dispatch => {
  API.getUser(id)
    .then(response =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};
