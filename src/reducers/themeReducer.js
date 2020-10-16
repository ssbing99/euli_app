/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';

const initialState = {
  isDark: false,
};

export const themeReducer = createReducer(initialState, {
  [types.TOGGLE_THEME](state, action) {
    return { ...state, isDark: action.isDark };
  },
});
