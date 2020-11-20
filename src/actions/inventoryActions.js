/*
 * Reducer actions related with login
 */

import * as types from '@actions/types';


export function saveItemsColorList(items, colors) {
  return {
    type: types.SAVE_ITEM_COLOR_LIST,
    items,
    colors
  };
}
