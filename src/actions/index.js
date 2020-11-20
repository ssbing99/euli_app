// export action creators
import * as colorActions from './colorActions';
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as themeActions from './themeActions';
import * as inventoryActions from './inventoryActions';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  themeActions,
  colorActions,
  inventoryActions
);
