import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


export async function getInvoice() {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVOICE,
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
