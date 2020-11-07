import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from '../styles/CommonStyles';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import color from 'hex-to-color-name';
import Text from '../elements/Text';
import Clipboard from '@react-native-community/clipboard';
import { Toast } from 'native-base';
import {
  colors,
  deviceWidth,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../styles/variables';
import {removeColor} from "../store/actionStore";

export default class ColorDetailsScreen extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.route.params);
    const { color } = this.props.route.params;

    this.color = color;
    console.log(color);
  }

  render() {
    return (
      <View style={[CommonStyles.container, { backgroundColor: colors.black }]}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.iconClose}
            source={require('../../img/icons/chevron-down.png')}
          />
        </TouchableOpacity>
        <View style={styles.containerElement}>
          <View style={styles.rect}>
            <View style={styles.lightGrayRow}>
              <Text style={[styles.colorText]}>{color(this.color.hex)}</Text>
              <Image
                source={require('../../img/icons/fullscreen.png')}
                style={styles.icon2}
              />
            </View>
            <View style={styles.rect2}>
              <TouchableOpacity onPress={() =>{
                Clipboard.setString(this.color.rgb);
                Toast.show({
                  text: 'Copied!',
                  buttonText: 'Okay',
                  style: {backgroundColor: colors.lightGray},
                  textStyle: {color: colors.black},
                  buttonTextStyle: {color: colors.black}
                })
              }}>
              <Image
                source={require('../../img/icons/content-copy.png')}
                style={styles.icon3}
              />
              </TouchableOpacity>
              <View style={styles.loremIpsumStack}>
                <Text style={styles.loremIpsum}>{this.color.rgb.replace(/[^0-9,]/g,'').split(',').join(', ')}</Text>
                <Text style={styles.rgb}>RGB</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.icon4Row}>
          <Image
            source={require('../../img/icons/export-variant.png')}
            style={styles.icon4}
          />
          <TouchableOpacity onPress={() => {
            removeColor(this.color).then(res =>{
              if(res) {
                Toast.show({
                  text: 'Color Deleted !',
                  buttonText: 'Okay',
                  type:'warning',
                  style: {backgroundColor: colors.lightGray},
                  textStyle: {color: colors.black},
                  buttonTextStyle: {color: colors.black}
                })
                this.props.navigation.goBack();
              }
            });
          }}>
          <Image
            source={require('../../img/icons/delete.png')}
            style={styles.icon6}
          />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  iconClose: {
    width: 40,
    height: 40,
    marginTop: NAV_HEIGHT - STATUSBAR_HEIGHT,
  },
  icon: {
    position: 'absolute',
    top: 5,
    left: 20,
  },
  rect: {
    width: 310,
    height: 336,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  containerElement: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
  },
  lightGray: {
    color: '#121212',
    marginTop: 4,
  },
  colorText: {
    textTransform: 'capitalize',
  },
  icon2: {
    height: 20,
    width: 20,
    marginLeft: 194,
  },
  lightGrayRow: {
    height: 23,
    flexDirection: 'row',
    marginTop: 28,
    marginLeft: 18,
    marginRight: 13,
  },
  rect2: {
    width: 269,
    height: 94,
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 165,
    marginLeft: 18,
    borderRadius: 5,
  },
  icon3: {
    height: 20,
    width: 20,
    marginTop: 18,
    marginLeft: 16,
  },
  loremIpsum: {
    top: 0,
    // left: 0,
    position: 'absolute',
    color: '#121212',
    alignSelf: 'center',
  },
  rgb: {
    top: 16,
    left: 34,
    position: 'absolute',
    color: '#121212',
  },
  loremIpsumStack: {
    width: 86,
    height: 35,
    marginLeft: 91,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon4: {
    width: 30,
    height: 30,
  },
  icon6: {
    width: 30,
    height: 30,
    marginLeft: 88,
    marginTop: 3,
  },
  icon4Row: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: deviceWidth,
    paddingHorizontal: 40,
  },
});

ColorDetailsScreen.propTypes = {
  navigation: PropTypes.any,
};
