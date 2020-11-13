/*
 * combines all th existing reducers
 */
import * as colorReducer from './colorReducer';
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
export default Object.assign(colorReducer, loginReducer, loadingReducer, themeReducer);
