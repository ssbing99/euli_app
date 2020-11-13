import AsyncStorage from '@react-native-community/async-storage';

const COLOR_KEY = '@color_key';

export const USER_KEY = 'member';
export const USER_TOKEN = 'bearer';

export const _storeData = async (key, item) => {
  try {
    const value = await AsyncStorage.setItem(key, JSON.stringify(item));
    return value;
  } catch (e) {
    console.log(e);
    return;
  }
}

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

export const _removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    console.log(e);
  }

}

export const _removeAll = async () => {
  try {
    await AsyncStorage.clear();
    return;
  } catch (e) {
    console.log(e);
    return;
  }
}

export const storeColor = async (color) => {
  try {
    const storedColor = await getColor().then((res) => {
      console.log('return ', res);

      if (!(res && res['colors'])) {
        let colors = [color];
        res['colors'] = colors;
      } else {
        let colors = res['colors'] || [];
        colors.push(color);

        res['colors'] = colors;
      }

      return res;
    });
    const jsonValue = JSON.stringify(storedColor);
    await AsyncStorage.setItem(COLOR_KEY, jsonValue);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

export const removeColor = async (color) => {
  try {
    const storedColor = await getColor().then((res) => {
      let colors = res['colors'];
      colors = colors.filter(
        (c) => c.hex !== color.hex && c.datetime !== color.datetime,
      );
      res['colors'] = colors;

      return res;
    });

    const jsonValue = JSON.stringify(storedColor);
    await AsyncStorage.setItem(COLOR_KEY, jsonValue);
  } catch (e) {
    // saving error
    console.error(e);
    return false;
  }

  return true;
};

export const getColor = async () => {
  try {
    const value = await AsyncStorage.getItem(COLOR_KEY);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
