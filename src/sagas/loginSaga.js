/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import { loginUser, getLoginRole } from 'src/api/methods/loginUser';
// import loginUser from 'src/api/methods/loginUser';
import * as loginActions from '../actions/loginActions';
import { _storeData, USER_KEY, USER_TOKEN } from '../store/actionStore';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  yield put(loginActions.enableLoader());

  //how to call api
  const response = yield call(loginUser, action.username, action.password);
  //mock response

  // const response = { success: true, data: { id: 1 } };
  if (!!response.success) {
    const role = yield call(getLoginRole,response.data.ReturnString);

    let data = response.data;
    data['role'] = role.success ? role.data : 'User';

    yield put(loginActions.onLoginResponse(data));
    // yield put(loginActions.disableLoader({}));

    _storeData(USER_KEY, {username: action.username});
    _storeData(USER_TOKEN, response.data.ReturnString);

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
    // setTimeout(() => {
    if(response.status == 401)
      Alert.alert('Login Failed', "Invalid Username or Password.");
    // }, 200);
  }
}
