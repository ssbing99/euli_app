import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';
import Base64 from '../../lib/Base64';


// export async function getPurchaseHistory(role) {
//
//   const token = await _retrieveData(USER_TOKEN);
//
//   return Api(
//     ApiConstants.PURCHASE_HISTORY,
//     null,
//     'get',
//     token,
//   );
// }

export async function getPurchaseHistory(customerId) {

  const token = await _retrieveData(USER_TOKEN);

  let apiPath = ApiConstants.PURCHASE_HISTORY;

  if (customerId && customerId !== null && customerId != 'undefined') {
    const custIdBase64 = Base64.btoa(customerId);
    apiPath += '/' + custIdBase64;
  }
  console.log('getPurchaseHistory', apiPath);
  return Api(
    apiPath,
    null,
    'get',
    token,
  );
}
