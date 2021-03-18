import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


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

  return Api(
    ApiConstants.CUSTOMER_BY_ID + id,
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
