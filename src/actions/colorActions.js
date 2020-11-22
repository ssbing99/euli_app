/*
 * Reducer actions related with login
 */

import * as types from '@actions/types';


export function saveColor(username, color) {
  return {
    type: types.SAVE_COLOR,
    username,
    color
  };
}

export function saveColorList(colors) {
  return {
    type: types.SAVE_COLOR_LIST,
    colors
  };
}

export function deleteColor(username, color) {
  return {
    type: types.DELETE_COLOR,
    username,
    color
  };
}
