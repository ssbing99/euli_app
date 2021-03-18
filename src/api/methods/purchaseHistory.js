import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


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
    const custIdBase64 = btoa(customerId);
    apiPath += '/' + custIdBase64;
  }

  return Api(
    apiPath,
    null,
    'get',
    token,
  );
}
