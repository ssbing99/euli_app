/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';

const initialState = {
  colors:{}
};

export const colorReducer = createReducer(initialState, {
  [types.SAVE_COLOR](state, action) {
    return {
      ...state,
    };
  },
  [types.SAVE_COLOR_LIST](state, action) {
    let newColor = state.colors[action.colors.username] || [];
    newColor.push(...action.colors.data);

    let newItems = {};
    newItems[`${action.colors.username}`] = newColor;
    const newList = Object.assign(state.colors, newItems);

    return {
      colors: newList
    };
  },
});
