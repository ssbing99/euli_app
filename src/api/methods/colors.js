import configureStore from '../../store/configureStore';

const {store} = configureStore();

const ItemsColor = {
  '237,241,254': ['VI60-WHITE', 'VI60-BW 1'],
  '241,232,223': ['VI60-1035'],
  '240,223,204': ['VI60-1036'],
  '243,230,201': ['VI60-7007'],
  '246,227,180': ['VI60-1057'],
  '244,227,181': ['VI60-1600'],
  '249,216,87': ['VI60-1081'],
  '228,191,69': ['VI60-126'],
  '209,160,84': ['VI60-1119'],
  '242,171,70': ['VI60-1082'],
  '252,158,33': ['VI60-216'],
  '38,38,42': ['VI60-BW 1'],

};

function getColorMatching ($r, $g, $b) {
  let $nmatches = 0, $newdist = 0;
  let $matches = '';
  let $dist = 255 * Math.sqrt(3.0);

  for (let i in ItemsColor) {
    let temp = i.split(',');

    if (temp[0] == $r && temp[1] == $g && temp[2] == $b) {
      $matches = i;
      ++$nmatches;
      $dist == 0;
    }
    if ($nmatches == 0) {
      $newdist = Math.sqrt(Math.pow($r - temp[0], 2) + Math.pow($g - temp[1], 2) + Math.pow($b - temp[2], 2));
      if ($newdist == $dist) {
        $matches = $matches + ' , ' + i;
      } else if ($newdist < $dist) {
        $dist = $newdist;
        $matches = i;
      }
    }

  }

  return $matches;
}

export async function getColorList (username) {

  const state = store.getState();

  const colors = state.colorReducer.colors;
  console.log('getColorList', colors);

  const userColor = colors[username] || [];

  return userColor;
}

/**
 * To find item of color from inventory
 *
 * @param userColor
 */
// TODO: find the best match
export function findColorItem (userColor) {

  const state = store.getState();

  const colorItem = state.inventoryReducer.items;

  let itemsArr = [];

  // console.log('colorItem', colorItem);

  if (Object.entries(userColor).length > 0) {
    const rgb = userColor.rgb.replace('rgb(', '').replace(')','').split(',');
    // console.log('rgb', rgb);
    const colorCode = getColorMatching(rgb[0], rgb[1], rgb[2]);
    // console.log('getColorMatching', colorCode);

    if (ItemsColor[colorCode]) {
      const itm = ItemsColor[colorCode];

      colorItem.forEach((it) => {
        itm.forEach((itArr) => {
          if (it.Id == itArr) {
            it['colorRGB'] = colorCode;
            itemsArr.push(it);
          }
        });
      });
    }

    // TODO: find the best match
    console.log(itemsArr);
  }

  return itemsArr;
  // return userColor.colorItems;

}
