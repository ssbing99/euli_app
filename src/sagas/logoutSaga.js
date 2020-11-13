/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import * as loginActions from '../actions/loginActions';
import { _removeValue, USER_KEY, USER_TOKEN } from '../store/actionStore';

// Our worker Saga that logins the user
export default function* logoutAsync() {
  yield put(loginActions.enableLoader());

  _removeValue(USER_TOKEN);
  _removeValue(USER_KEY);

  console.log("LOGOUT SAGA");

  yield put(loginActions.disableLoader({}));

}
