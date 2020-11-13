import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';


export async function getInventoryItem() {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemById(id) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY_BY_ID + id,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemByKeyword(keyword) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY_BY_KEYWORD + keyword,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemByColor(rgbCode) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY_BY_COLOR + rgbCode,
    null,
    'get',
    token,
  );
}
