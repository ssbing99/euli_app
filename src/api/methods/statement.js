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

export async function getStatementByDate(dateStr) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.STATEMENT_BY_DATE + dateStr,
    null,
    'get',
    token,
  );
}


export async function getStatementByDateAndId(dateStr, customerId) {

  const token = await _retrieveData(USER_TOKEN);

  let apiPath = ApiConstants.STATEMENT_BY_DATE + dateStr;

  if (customerId && customerId !== null && customerId != 'undefined') {
    const custIdBase64 = btoa(customerId);
    apiPath += ',' + custIdBase64;
  }

  return Api(
    apiPath,
    null,
    'get',
    token,
  );
}
