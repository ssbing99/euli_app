import Api from 'src/api';
import ApiConstants from 'src/api/ApiConstants';
import { _retrieveData, USER_TOKEN } from 'src/store/actionStore';
import { useDispatch, useSelector } from 'react-redux';
import * as inventoryActions from '../../actions/inventoryActions';

export async function getInventoryItem () {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemById (id) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY_BY_ID + id,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemByKeyword (keyword) {

  const token = await _retrieveData(USER_TOKEN);

  return Api(
    ApiConstants.INVENTORY_BY_KEYWORD + keyword,
    null,
    'get',
    token,
  );
}

export async function getInventoryItemByRGB (rgbCode) {

  const token = await _retrieveData(USER_TOKEN);

  let Rcode = rgbCode.split(',')[0];
  let Gcode = rgbCode.split(',')[1];
  let Bcode = rgbCode.split(',')[2];

  let rgbUrl =
    ApiConstants.INVENTORY_BY_RGB
    .replace(':Rcode', Rcode)
    .replace(':Gcode', Gcode)
    .replace(':Bcode', Bcode);

  return Api(
    rgbUrl,
    null,
    'get',
    token,
  );
}
