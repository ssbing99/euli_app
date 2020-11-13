/*
 * Reducer actions related with login
 */

import * as types from '@actions/types';


export function saveColor(username, colorHex, colorRGB) {
  return {
    type: types.SAVE_COLOR,
    username,
    colorHex,
    colorRGB
  };
}

export function saveColorList(colors) {
  return {
    type: types.SAVE_COLOR_LIST,
    colors
  };
}
