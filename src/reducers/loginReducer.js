/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';

const initialState = {
  isLoggedIn: false,
  id: 0,
  customerId: '',
  username: '',
  password: '',
  bearerToken: '',
  role: 'company',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_LOADING_ENDED](state) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state, action) {
    let thisRole = 'company';
    if(action.response.role && action.response.role != 'User'){
      thisRole = 'customer';
    }
    return {
      ...state,
      bearerToken: action.response.ReturnString,
      isLoggedIn: true,
      role: thisRole,
      customerId: action.response.customerId,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
      id: 0,
      username: '',
      password: '',
      bearerToken: '',
      role: 'company',
    };
  },
});
