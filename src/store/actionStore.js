import AsyncStorage from '@react-native-community/async-storage';

const COLOR_KEY = '@color_key';

export const storeColor = async (color) => {
    try {
        const storedColor = await getColor().then(res => {
            console.log("return ",res);

            if(!(res && res['colors'])){
                let colors = [color];
                res['colors'] = colors;
            }else{
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
}

export const removeColor = async (color) => {
    try {
        const storedColor = await getColor().then(res => {
            let colors = res['colors'];
            colors = colors.filter(c => c.hex !== color.hex && c.datetime !== color.datetime);
            res['colors'] = colors;

            return res;
        });
        console.log("storedColor",storedColor);

        const jsonValue = JSON.stringify(storedColor);
        await AsyncStorage.setItem(COLOR_KEY, jsonValue);

    } catch (e) {
        // saving error
        console.error(e);
        return false;
    }

    return true;
}

export const getColor = async () => {
    try {
        const value = await AsyncStorage.getItem(COLOR_KEY);
        // console.log("getValue", value);
        if(value !== null) {
            return JSON.parse(value);
        }else{
            return {};
        }
    } catch(e) {
        // error reading value
        console.log(e);
    }
}
