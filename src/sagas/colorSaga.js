/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { getInventoryItemByColor } from '../api/methods/inventoryItem';
import * as colorActions from '../actions/colorActions';
import { Toast } from "native-base";

// Our worker Saga that logins the user
export default function* colorAsync(action) {

  let rgb = action.colorRGB.replace(/[^0-9,]/g, '').trim();
  // let rgb = '255,87,51';
  // let rgb = '35,95,60';

  //how to call api
  const response = yield call(getInventoryItemByColor, rgb);

  //process data and restore
  if(!!response.success && response.data.length > 0){
    let colors = response.data;

    colors.map(c => {
      c['colorRGB'] = rgb
    });

    let userColor = {
      username: action.username,
      data: colors
    };

    console.log("userColor",userColor);

    Toast.show({
      text: 'New Items Found!',
      buttonText: 'Okay',
      style: { backgroundColor: 'rgb(216,216,216)' },
      textStyle: { color: '#121314' },
      buttonTextStyle: { color: '#121314' },
    });

    yield put(colorActions.saveColorList(userColor));

  }
}
