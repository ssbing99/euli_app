import { CUST_FUNC, MAST_FUNC } from '../config/access';

function getRoleAccess(role) {
  // Master
  if(role === 'company'){
    return MAST_FUNC;
  }else if(role === 'customer'){
    return CUST_FUNC;
  }else{
    return [];
  }
}

export function hasAccessRight(role, funcName) {

  return getRoleAccess(role).indexOf(funcName) != -1;

}
