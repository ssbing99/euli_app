import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';

export default function loginUser(username, password) {

  let params = {
    "CompanyID": "Euli Textile Demo",
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
