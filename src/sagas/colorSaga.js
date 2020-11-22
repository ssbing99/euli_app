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
import { Toast } from 'native-base';

// Our worker Saga that logins the user
function* calculateMatching (rgb, colorsList) {

  let dist = 255 * Math.sqrt(3.0);
  let rgbArr = rgb.split(',');
  let r1 = rgbArr[0];
  let g1 = rgbArr[1];
  let b1 = rgbArr[2];

  let matched = null;
  let calCol = [];
  let colMap = new Map();

  console.log('RGB', rgb);

  colorsList.forEach(color => {
    let colArr = color.split(',');
    let r2 = colArr[0];
    let g2 = colArr[1];
    let b2 = colArr[2];

    // let dist = Math.sqrt(
    //   Math.pow((r1-r2),2 ) + Math.pow((g1-g2),2 ) + Math.pow((b1-b2),2 )
    // );

    let cal = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

    // console.log(color, cal);

    // if(cal < dist){
    //   dist = cal;
    colMap.set(color, cal);
    calCol.push(cal);
    // }

  });

  calCol = calCol.sort((a, b) => a - b);
  // console.log(calCol);

  if (colMap.size > 0) {

    colMap.forEach((value, key) => {
      if (value === calCol[0]) {
        matched = key;
      }
    });

    console.log('KEY', matched);
  }

  return matched;

}

export default function* colorAsync (action) {

  // let rgb = action.color.rgb.replace(/[^0-9,]/g, '').trim();
  let rgb = '255,87,51';
  // let rgb = '35,95,60';

  const colorsList = yield select((state) => state.inventoryReducer.colors);
  const itemsList = yield select((state) => state.inventoryReducer.items);
  const userColorList = yield select((state) => state.colorReducer.colors);

  const matched = yield calculateMatching(rgb, colorsList);

  let newColors = [];
  let newItems = [];

  if (matched != null) {

    let existing = userColorList[action.username] || [];

    // console.log(userColorList);

    colorsList.forEach(color => {
      if (color === matched) {
        newColors.push(color);
      }
    });

    if (newColors.length > 0) {

      itemsList.forEach(item => {
        if (item['ColorCode'] && item['ColorCode'] === matched) {

          item['colorRGB'] = item['ColorCode'];
          newItems.push(item);
        }
      });

    }

  }

  let arrObj = [{
    ...action.color,
    colorItems: newItems
  }];

  let userColor = {
    username: action.username,
    data: arrObj
  };

  console.log(userColor);
  // if have newItems
  if(newItems.length > 0) {

    Toast.show({
      text: 'New Items Found!',
      buttonText: 'Okay',
      style: {backgroundColor: 'rgb(216,216,216)'},
      textStyle: {color: '#121314'},
      buttonTextStyle: {color: '#121314'},
    });

  }

  yield put(colorActions.saveColorList(userColor));

  // //how to call api
  // const response = yield call(getInventoryItemByColor, rgb);

  // //process data and restore
  // if(!!response.success && response.data.length > 0){
  //   let colors = response.data;
  //
  //   colors.map(c => {
  //     c['colorRGB'] = rgb
  //   });
  //
  //   let userColor = {
  //     username: action.username,
  //     data: colors
  //   };
  //
  //   console.log("userColor",userColor);
  //
  //   Toast.show({
  //     text: 'New Items Found!',
  //     buttonText: 'Okay',
  //     style: { backgroundColor: 'rgb(216,216,216)' },
  //     textStyle: { color: '#121314' },
  //     buttonTextStyle: { color: '#121314' },
  //   });
  //
  //   yield put(colorActions.saveColorList(userColor));
  //
  // }
}
