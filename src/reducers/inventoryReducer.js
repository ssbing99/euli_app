/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';

const initialState = {
  items:[],
  colors:[]
};

export const inventoryReducer = createReducer(initialState, {
  [types.SAVE_ITEM_COLOR_LIST](state, action) {
    console.log("action", action);
    return {
      colors: action.colors,
      items: action.items
    };
  },
});
