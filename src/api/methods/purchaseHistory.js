import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


export async function getPurchaseHistory() {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.PURCHASE_HISTORY,
    null,
    'get',
    token,
  );
}
