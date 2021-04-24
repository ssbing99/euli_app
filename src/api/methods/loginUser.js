import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from '../../store/actionStore';

export function loginUser(username, password) {

  let params = {
    "CompanyID": "Euli Textile Trading",
    "LoginUserId": username,
    "LoginPassword": password
  };
  return Api(
    ApiConstants.LOGIN,
    params,
    'post',
    null,
  );
}

export async function getLoginRole(token) {

  return Api(
    ApiConstants.LOGIN_IDENTITY,
    null,
    'get',
    token,
  );
}

