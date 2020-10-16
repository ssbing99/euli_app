import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from '../styles/CommonStyles';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import { RNCamera } from 'react-native-camera';
import {
  colors,
  deviceWidth,
  responsiveHeight,
  responsiveWidth,
} from '../styles/variables';
import { Switch } from 'react-native-switch';
import ColorViewer from '@components/ColorViewer';

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
    };
  }

  render() {
    const { isEnabled } = this.state;

    return (
      <View style={CommonStyles.container}>
        {/* <NavigationBar navigation={this.props.navigation} /> */}
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          ratio={'4:3'}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.componentContainer}>
          <Switch
            trackColor={{ false: colors.darkGray, true: colors.green }}
            backgroundActive={colors.transparent}
            backgroundInactive={colors.transparent}
            activeText={'Still'}
            inActiveText={'Live'}
            circleSize={35}
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{
              borderWidth: 1,
              borderRadius: 35,
              borderColor: colors.white,
            }}
            innerCircleStyle={{
              borderColor: colors.white,
            }}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30}
            onValueChange={() => this.setState({ isEnabled: !isEnabled })}
            value={isEnabled}
          />

          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            {/* <Text style={{ fontSize: 14 }}>SNAP</Text> */}
            <Image
              source={require('../../img/icons/image-album.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 12.5, height: 25 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.capturedContainer}>
          <ColorViewer
            color={colors.red}
            onPressItem={() =>
              this.props.navigation.navigate('ColorDetailsScreen')
            }
          />
          <ColorViewer
            color={colors.green}
            onPressItem={() =>
              this.props.navigation.navigate('ColorDetailsScreen')
            }
          />
          <ColorViewer
            color={colors.white}
            imgWidth={60}
            imgHeight={60}
            onPressItem={() =>
              this.props.navigation.navigate('ColorDetailsScreen')
            }
          />
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
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: colors.transparent,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    borderColor: colors.white,
    justifyContent: 'flex-end',
    margin: 20,
    borderWidth: 1,
  },
  componentContainer: {
    position: 'absolute',
    bottom: 75,
    width: deviceWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  capturedContainer: {
    position: 'absolute',
    bottom: 20,
    width: deviceWidth,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
});

ScanScreen.propTypes = {
  navigation: PropTypes.any,
};
