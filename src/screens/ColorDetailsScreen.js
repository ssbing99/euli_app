import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from '../styles/CommonStyles';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import color from 'hex-to-color-name';
import Text from '../elements/Text';
import Clipboard from '@react-native-community/clipboard';
import { Toast } from 'native-base';
import {
  colors, deviceHeight, deviceWidth, NAV_HEIGHT, STATUSBAR_HEIGHT,
} from '../styles/variables';
import { removeColor } from '../store/actionStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import * as colorActions from '../actions/colorActions'

class ColorDetailsScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      enlarge: false,
      enlargeIcon: 'fullscreen'
    };

    const { color, username } = this.props.route.params;
    this.color = color;
    this.username = username;

    this.useColor = colors.black;
    this.textColor = { color: colors.black };
    this.borderColor = { borderColor: colors.black };

    this.getContrastColor(this.color.rgb);

    this.SHARE_OPTION = {
      title: 'EULI Color',
      subject: 'EULI Color',
      message: `Euli wanted to send color ${ this.color.rgb }`
    };
  }

  getContrastColor = (colorRgb) => {
    let colorSplit = colorRgb.replace(/[^0-9,]/g, '').split(',');
    let isGreater = (colorSplit[0] * 0.299) + (colorSplit[1] * 0.587) + (colorSplit[2] * 0.114);
    if (isGreater > 186) {
      this.useColor = colors.black;
      this.textColor = { color: colors.black };
      this.borderColor = { borderColor: colors.black };
    } else {
      this.useColor = colors.white;
      this.textColor = { color: colors.white };
      this.borderColor = { borderColor: colors.white };
    }
  };

  getTextColor = () => {
    return this.textColor;
  };

  getBorderColor = () => {
    return this.borderColor;
  };

  getBoxMargin = () => {
    if (this.state.enlarge) {
      return { position: 'absolute', marginTop: deviceHeight / 2 };
    }
  };

  getBoxMarginTop = () => {
    if (this.state.enlarge) {
      return { marginTop: deviceHeight / 5 };
    }
  };

  getEnlargeSize = () => {
    if (this.state.enlarge) {
      return { width: deviceWidth, height: deviceHeight, marginTop: 50 };
    }
  };

  renderIcon = () => {
    return <TouchableOpacity onPress={ () => this.onClickIcon() } style={ { flex: 0 } }>
      <Icon name={ this.state.enlargeIcon } style={ [styles.icon2] } color={ this.useColor } size={ 20 }/>
    </TouchableOpacity>;
  };

  onClickIcon = () => {
    if (this.state.enlargeIcon.indexOf('exit') <= -1) {
      this.setState({ enlarge: true, enlargeIcon: 'fullscreen-exit' });
    } else {
      this.setState({ enlarge: false, enlargeIcon: 'fullscreen' });
    }

  };

  removeColor = () => {
    removeColor(this.color).then((res) => {
      if (res) {
        this.props.onPressDelete(this.props.username, this.color);

        Toast.show({
          text: 'Color Deleted !', buttonText: 'Okay', type: 'warning', style: { backgroundColor: colors.lightGray }, textStyle: { color: colors.black },
          buttonTextStyle: { color: colors.black },
        });
        this.props.navigation.goBack();
      }
    });
  }

  render () {
    return (<View style={ [CommonStyles.container, { backgroundColor: colors.black, opacity: 0.9 }] }>

      <View style={ styles.containerElement }>
        <View style={ [styles.rect, this.getEnlargeSize(), { backgroundColor: this.color.hex }] }>
          <View style={ [styles.lightGrayRow, this.getBoxMarginTop()] }>
            <Text style={ [{ flex: 0 }, styles.colorText, this.getTextColor()] }>{ color(this.color.hex) }</Text>
            { this.renderIcon() }
          </View>
          <View style={ [styles.rect2, this.getBoxMargin()] }>
            <TouchableOpacity
              onPress={ () => {
                Clipboard.setString(this.color.rgb);
                Toast.show({
                  text: 'Copied!',
                  buttonText: 'Okay',
                  style: { backgroundColor: colors.lightGray },
                  textStyle: { color: colors.black },
                  buttonTextStyle: { color: colors.black },
                });
              } }>
              <Image
                source={ require('../../img/icons/content-copy.png') }
                style={ styles.icon3 }
              />
            </TouchableOpacity>
            <View style={ styles.loremIpsumStack }>
              <Text style={ [styles.loremIpsum] }>
                { this.color.rgb.replace(/[^0-9,]/g, '').split(',').join(', ') }
              </Text>
              <Text style={ [styles.rgb] }>RGB</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={ styles.icon }
        onPress={ () => this.props.navigation.goBack() }>
        <Image
          style={ styles.iconClose }
          source={ require('../../img/icons/chevron-down.png') }
        />
      </TouchableOpacity>
      <View style={ styles.icon4Row }>
        <TouchableOpacity
          onPress={ () => {
            Share.open(this.SHARE_OPTION).then((res) => {
              console.log(res);
            }).catch((err) => {
              err && console.log(err);
            });
          } }>
          <Image
            source={ require('../../img/icons/export-variant.png') }
            style={ styles.icon4 }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ this.removeColor }>
          <Image
            source={ require('../../img/icons/delete.png') }
            style={ styles.icon6 }
          />
        </TouchableOpacity>
      </View>
    </View>);
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressDelete: (username, color) => dispatch(colorActions.deleteColor(username, color))
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorDetailsScreen);

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
    borderWidth: 1,
    alignItems: 'center'
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
  },
  lightGrayRow: {
    height: 23,
    flexDirection: 'row',
    marginTop: 28,
    width: (310 * .8),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rect2: {
    width: 269,
    height: 94,
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 165,
    // marginLeft: 18,
    borderRadius: 5,
    alignSelf: 'center',
  },
  icon3: {
    height: 20,
    width: 20,
    marginTop: 18,
    marginLeft: 16,
  },
  loremIpsum: {
    top: 0, // left: 0,
    position: 'absolute',
    color: '#121212',
    alignSelf: 'center',
  },
  rgb: {
    top: 16,
    // left: 34,
    alignSelf: 'center',
    position: 'absolute',
    color: '#121212',
  },
  loremIpsumStack: {
    width: 120,
    height: 35,
    // marginLeft: 91,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
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
  onPressDelete: PropTypes.any,
};
