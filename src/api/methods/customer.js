import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';
import Base64 from '../../lib/Base64';


export async function getCustomer() {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.CUSTOMER,
    null,
    'get',
    token,
  );
}

export async function getCustomerById(id) {

  const token = await _retrieveData(USER_TOKEN);

  const custIdBase64 = Base64.btoa(id);

  return Api(
    ApiConstants.CUSTOMER_BY_ID + custIdBase64,
    null,
    'get',
    token,
  );
}

export async function getCustomerByKeyword(keyword) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.CUSTOMER_BY_KEYWORD + keyword.trim(),
    null,
    'get',
    token,
  );
}
