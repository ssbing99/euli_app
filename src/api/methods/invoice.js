import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


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
    const custIdBase64 = btoa(customerId);
    apiPath = ApiConstants.INVOICE_LIST_BY_ID + '/' + custIdBase64;
  }

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
