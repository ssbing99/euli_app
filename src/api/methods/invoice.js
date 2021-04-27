import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';
import Base64 from '../../lib/Base64';


export async function getInvoice(role) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVOICE,
    null,
    'get',
    token,
  );
}

export async function getInvoiceListById(customerId) {

  const token = await _retrieveData(USER_TOKEN);

  let apiPath = ApiConstants.INVOICE;

  if (customerId && customerId !== null && customerId != 'undefined') {
    const custIdBase64 = Base64.btoa(customerId);
    apiPath = ApiConstants.INVOICE_LIST_BY_ID + custIdBase64;
  }
  console.log('getInvoiceListById', apiPath);
  return Api(
    apiPath,
    null,
    'get',
    token,
  );
}

export async function getInvoiceById(id) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVOICE_BY_ID + id,
    null,
    'get',
    token,
  );
}
