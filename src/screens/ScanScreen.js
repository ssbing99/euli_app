import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from '../styles/CommonStyles';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import GetPixelColor from 'react-native-get-pixel-color';
import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import { RNCamera } from 'react-native-camera';
import {
  isIOS, colors, deviceWidth, deviceHeight, responsiveHeight, responsiveWidth,
} from '../styles/variables';
import { Switch } from 'react-native-switch';
import ColorViewer from '@components/ColorViewer';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ImagePicker from 'react-native-image-crop-picker';
import { storeColor, getColor } from '../store/actionStore';

/*
 * https://github.com/herbert84/react-native-pixel-color-picker/blob/master/src/ColorPicker.android.js
 *
 * https://github.com/dudyn5ky1/react-native-get-pixel-color
 * */
const CAM_OPTIONS = {
  quality: 1, base64: true, orientation: RNCamera.Constants.Orientation.portrait, fixOrientation: true, forceUpOrientation: true,
};

export default class ScanScreen extends Component {
  constructor (props) {
    super(props);

    this.resetState();
    this.getUpdateColor();
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      // console.log("focus")
      this.getUpdateColor();
    });
  }

  componentWillUnmount () {
    // console.log("reset")
    this.resetState();

    try {
      console.log(this.focusListener);
      if (this.focusListener) {
        this.focusListener.remove();
      }
    } catch (e) {}
  }

  resetState = () => {
    this.state = {
      camera: {
        exposure: -1, exposureOn: false, flashOn: false, flashMode: RNCamera.Constants.FlashMode.off, ON: {
          flashMode: RNCamera.Constants.FlashMode.torch, flashIcon: 'flash-on',
        }, OFF: {
          flashMode: RNCamera.Constants.FlashMode.off, flashIcon: 'flash-off',
        },
      },
      mainView: { height: deviceHeight, width: deviceWidth },
      dragView: {},
      width: deviceWidth,
      height: deviceHeight,
      isEnabled: false,
      points: [],
      capColor: colors.transparent,
      capImage: {},
      liveImg: {},
      origin: {},
      storeColor: [],
    };
  };

  getUpdateColor = () => {
    getColor().then((res) => {
      let getColor = res['colors'] || [];

      if (getColor.length > 0) {
        getColor = getColor.sort((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime);
        });
        console.log(getColor);
      }
      this.setState({ storeColor: getColor });
    });
  };

  getFlashMode = () => {
    const { camera } = this.state;
    const flashOps = camera.flashOn ? camera.ON : camera.OFF;
    return flashOps.flashMode;
  };

  getPercentageByPixel (pixel, widthOrHeight) {
    return (pixel / widthOrHeight) * 100;
  }

  getPixelByPercentage (percentage, widthOrHeight) {
    return (percentage / 100) * widthOrHeight;
  }

  hex2rgb (hex) {
    let rgb = [('0x' + hex[1] + hex[2]) | 0, ('0x' + hex[3] + hex[4]) | 0, ('0x' + hex[5] + hex[6]) | 0,];
    return `rgb(${ rgb.join(',') })`;
  }

  getPixel (imageData, x, y) {
    console.log(`getPixel: X = ${ x }, Y = ${ y }`);
    //
    try {
      GetPixelColor.setImage(isIOS ? imageData.uri : imageData.base64).catch((err) => {
        // Handle errors
        console.error(err);
      },);

      GetPixelColor.pickColorAt(x, y).then((color) => {
        // console.log("COLOR", color);
        // console.log("COLOR RGB", this.hex2rgb(color));
        const colorObj = {
          hex: color, rgb: this.hex2rgb(color), datetime: new Date().getTime(),
        };
        this.setState({ capColor: color });

        storeColor(colorObj).then(() => {
          this.getUpdateColor();
        });
      }).catch((err) => {
        // Handle errors
        console.error(err);
      });
    } catch (e) {}
  }

  onDragEvt = (event, gestureState, bounds) => {
    let sourceWidth = this.state.liveImg.width;
    let sourceHeight = this.state.liveImg.height;

    // Find view dimensions
    let width = this.state.mainView.width;
    let height = this.state.mainView.height;

    // Assuming image has been scaled to the smaller dimension to fit, calculate the scale
    let wScale = width / sourceWidth;
    let hScale = height / sourceHeight;
    let scale = Math.min(wScale, hScale);

    // console.log("sourceWidth",sourceWidth);
    // console.log("sourceHeight",sourceHeight);
    // console.log("wScale",wScale);
    // console.log("hScale",hScale);
    // console.log("scale",scale);

    // Find the offset in the direction the image doesn't fill the screen
    // For ImageViews that wrap the content, both offsets will be 0 so this is redundant
    let offsetX = 0;
    let offsetY = 0;
    if (wScale <= hScale) {
      offsetY = height / 2 - (scale * sourceHeight) / 2;
    } else {
      offsetX = width / 2 - (scale * sourceWidth) / 2;
    }

    // console.log("offsetX",offsetX);
    // console.log("offsetY",offsetY);

    // Convert event coordinates to image coordinates
    let sourceX = (gestureState.moveX - offsetX) / scale;
    let sourceY = (gestureState.moveY - offsetY) / scale;

    if (sourceX < 0) {
      sourceX = 0;
    } else if (sourceX > sourceWidth) {
      sourceX = sourceWidth - 5;
    }

    if (sourceY < 0) {
      sourceY = 0;
    } else if (sourceY > sourceHeight) {
      sourceY = sourceHeight - 5;
    }

    this.setState({ dragView: { x: sourceX, y: sourceY } }, () => {
      console.log(this.state.dragView);
    });
  };

  captureColor = async () => {
    if (this.state.isEnabled) {
      // live view

      const { dragView, liveImg } = this.state;

      if (Object.keys(dragView).length !== 0) {
        let sourceX = dragView.x;
        let sourceY = dragView.y;

        this.getPixel(liveImg.data, sourceX, sourceY);
      } else {
        let getPiX = this.getPixelByPercentage(50, liveImg.width);
        let getPiY = this.getPixelByPercentage(50, liveImg.height);

        // console.log("LIVE getPiX", getPiX);
        // console.log("LIVE getPiY", getPiY);
        this.getPixel(liveImg.data, getPiX, getPiY);
      }
    } else {
      if (this.camera) {
        const data = await this.camera.takePictureAsync(CAM_OPTIONS);

        // const size = await this.camera.getAvailablePictureSizes();
        // const ratio = await this.camera.getSupportedRatiosAsync();

        // console.log(size);
        // console.log(ratio);
        // console.log(data);
        await Image.getSize(data.uri, (width, height) => {
          console.log('W: ', width);
          console.log('H: ', height);
          this.setState({
            capImage: {
              data: data, imageBase64: data.base64, width: width, height: height,
            },
          });
        }).then((res) => {
          const { capImage } = this.state;

          let getPiX = this.getPixelByPercentage(50, capImage.width);
          let getPiY = this.getPixelByPercentage(50, capImage.height);

          this.getPixel(capImage.data, getPiX, getPiY);
        });
      }
    }
  };

  openGallery = () => {
    ImagePicker.openPicker({
      width: 480, height: 640, cropping: true, mediaType: 'photo', includeBase64: true, avoidEmptySpaceAroundImage: true, compressImageMaxWidth: 480, compressImageMaxHeight: 640, forceJpg: true,
    }).then(async (response) => {
      // console.log(response);
      const { width, height } = response;
      // console.log("SELECTED W", width);
      // console.log("SELECTED h", height);
      const data = {
        uri: response.path, base64: response.data,
      };

      this.setState({
        liveImg: {
          data: data, imageBase64: data.base64, width: width, height: height,
        },
      }, () => {
        this.setState({
          isEnabled: true, camera: { ...this.state.camera, exposureOn: false, exposure: -1 },
        });
      },);
    }).catch((err) => console.warn(err));
  };

  switchChange = async () => {
    if (this.state.isEnabled) {
      this.setState({
        camera: {
          exposure: -1, exposureOn: false, flashOn: false, flashMode: RNCamera.Constants.FlashMode.off, ON: {
            flashMode: RNCamera.Constants.FlashMode.torch, flashIcon: 'flash-on',
          }, OFF: {
            flashMode: RNCamera.Constants.FlashMode.off, flashIcon: 'flash-off',
          },
        }, liveImg: {}, dragView: {}, isEnabled: !this.state.isEnabled,
      });
    } else {
      if (this.camera) {
        const data = await this.camera.takePictureAsync(CAM_OPTIONS);

        // const size = await this.camera.getAvailablePictureSizes();
        //
        // console.log(size);
        // console.log(data);
        await Image.getSize(data.uri, (width, height) => {
          // console.log("W: ", (width));
          // console.log("H: ", (height));
          this.setState({
            liveImg: {
              data: data, imageBase64: data.base64, width: width, height: height,
            }, isEnabled: !this.state.isEnabled, camera: { ...this.state.camera, exposureOn: false, exposure: -1 },
          });
        }).then((res) => {
        });
      }
    }
  };

  switchFlash = () => {
    const { camera } = this.state;
    const flashOn = !camera.flashOn;
    const flashOps = flashOn ? camera.ON : camera.OFF;

    this.setState({
      camera: { ...camera, flashOn: flashOn, flashMode: flashOps.flashMode },
    });
  };

  multiSliderValuesChange = (values) => {
    const { camera } = this.state;
    let val = Math.round(values * 100) / 100;
    this.setState({
      camera: { ...camera, exposure: val },
    });
  };

  renderCamView = () => {
    if (this.state.isEnabled) {
      return (<Image
        // source={{ uri: `data:image/png;base64,${this.state.liveImg.imageBase64}`}}
        source={ { uri: this.state.liveImg.data.uri } }
        style={ styles.imgPreview }
      />);
    } else {
      return (<RNCamera
        ref={ (ref) => {
          this.camera = ref;
        } }
        style={ styles.preview }
        type={ RNCamera.Constants.Type.back }
        flashMode={ this.getFlashMode() }
        exposure={ this.state.camera.exposure }
        ratio={ '3:2' }
        pictureSize={ '640x480' }
        captureAudio={ false }
        androidCameraPermissionOptions={ {
          title: 'Permission to use camera', message: 'We need your permission to use your camera', buttonPositive: 'Ok', buttonNegative: 'Cancel',
        } }
      />);
    }
  };

  renderCenterView = () => {
    if (this.state.isEnabled) {
      const { liveImg, mainView } = this.state;
      //TO-DO: control the draggleble maximum x and y

      return (<Draggable
        x={ this.state.mainView.width / 2 - 20 }
        y={ this.state.mainView.height / 2 - 20 }
        isCircle
        onShortPressRelease={ this.captureColor }
        onDragRelease={ this.onDragEvt }
        minX={ 0 }
        minY={ 0 }
        maxX={ this.state.mainView.width }
        maxY={ this.state.mainView.height }>
        <View
          style={ {
            width: 50, height: 50, borderWidth: 15, borderRadius: 50, borderColor: '#d1c1b6', opacity: 0.8,
          } }></View>
      </Draggable>);
    } else {
      return (<TouchableOpacity
        onPress={ this.captureColor }
        style={ [styles.middlePoint, {
          top: this.state.mainView.height / 2 - 20, left: this.state.mainView.width / 2 - 20,
        },] }
      />);
    }
  };

  renderFlash = () => {
    const { camera } = this.state;
    const flashOps = camera.flashOn ? camera.ON : camera.OFF;

    return (<TouchableOpacity onPress={ this.switchFlash } style={ styles.capture }>
      <Icon name={ flashOps.flashIcon } size={ 20 } color={ 'white' }/>
    </TouchableOpacity>);
  };

  renderExposure = () => {
    const { camera } = this.state;
    const exposureOn = !camera.exposureOn;

    return (<TouchableOpacity
      onPress={ () => {
        this.setState({
          camera: {
            ...camera, exposureOn: exposureOn, exposure: exposureOn ? 0 : -1,
          },
        });
      } }
      style={ styles.capture }>
      <Icon name={ 'exposure' } size={ 20 } color={ 'white' }/>
    </TouchableOpacity>);
  };

  renderGallery = () => {
    return (<TouchableOpacity onPress={ this.openGallery } style={ styles.capture }>
      <Image
        source={ require('../../img/icons/image-album.png') }
        style={ { width: 12.5, height: 25 } }
      />
    </TouchableOpacity>);
  };

  renderSlider = () => {
    if (this.state.camera.exposureOn) {
      return (<View style={ styles.sliderContainer }>
        <View style={ styles.sliderText }>
          <Text white normal regular>
            { this.state.camera.exposure }
          </Text>
        </View>
        <MultiSlider
          values={ [0] }
          sliderLength={ responsiveWidth(80) }
          onValuesChange={ this.multiSliderValuesChange }
          min={ -1 }
          max={ 1 }
          step={ 0.1 }
          allowOverlap
          containerStyle={ {
            height: 40, paddingTop: 20,
          } }
          selectedStyle={ {
            backgroundColor: colors.white,
          } }
          unselectedStyle={ {
            backgroundColor: 'rgb(232,232,232)',
          } }
          pressedMarkerStyle={ {
            width: 9, height: 9,
          } }
          markerStyle={ {
            height: 12, width: 12, backgroundColor: colors.white, borderColor: 'transparent',
          } }
        />
      </View>);
    }
  };

  renderColorViewList = () => {
    const { storeColor } = this.state;

    if (storeColor && storeColor.length > 0) {
      let colorView = [];

      for (let i = 0; i < storeColor.length && i < 4; i++) {
        colorView.push(<ColorViewer
          key={ storeColor[i].datetime }
          color={ storeColor[i].hex }
          onPressItem={ () => this.props.navigation.navigate('ColorDetailsScreen', {
            color: storeColor[i],
          }) }
        />,);
      }

      return <View style={ styles.capturedContainer }>{ colorView }</View>;
    }

    // return (
    //     <View style={styles.capturedContainer}>
    //       <ColorViewer
    //           color={colors.red}
    //           onPressItem={() =>
    //               this.props.navigation.navigate('ColorDetailsScreen')
    //           }
    //       />
    //       <ColorViewer
    //           color={colors.green}
    //           onPressItem={() =>
    //               this.props.navigation.navigate('ColorDetailsScreen')
    //           }
    //       />
    //       <ColorViewer
    //           color={colors.white}
    //           imgWidth={60}
    //           imgHeight={60}
    //           onPressItem={() =>
    //               this.props.navigation.navigate('ColorDetailsScreen')
    //           }
    //       />
    //     </View>
    // );
  };

  render () {
    const { isEnabled } = this.state;

    return (<View
      ref={ (ref) => {
        this.mainView = ref;
      } }
      style={ CommonStyles.container }
      onLayout={ (event) => {
        const layout = event.nativeEvent.layout;
        // console.log('layout', layout);
        this.setState({
          mainView: { height: layout.height, width: layout.width },
        });
        // this.setState({ dragView: {y: layout.height, x: layout.width, xperc: 50, yperc: 50} });
        // this.setState({ origin: {y: layout.height, x: layout.width, xperc: 50, yperc: 50} });
      } }>
      {/* <NavigationBar navigation={this.props.navigation} /> */ }

      { this.renderCamView() }
      { this.renderCenterView() }

      <View
        key={ 'origin' }
        style={ [styles.upperPoint, {
          borderColor: this.state.capColor, backgroundColor: this.state.capColor,
        },] }></View>

      {/*<Image*/ }
      {/*    source={{ uri: `data:image/png;base64,${this.state.capImage.imageBase64}`}}*/ }
      {/*    style={{ top:(deviceHeight/5)-20, left:(deviceWidth/5)-20, height: '20%', width: '20%', position:'absolute' }}*/ }
      {/*/>*/ }

      { this.renderSlider() }

      <View style={ styles.componentContainer }>
        <Switch
          trackColor={ { false: colors.darkGray, true: colors.green } }
          backgroundActive={ colors.transparent }
          backgroundInactive={ colors.transparent }
          activeText={ 'Still' }
          inActiveText={ 'Live' }
          circleSize={ 35 }
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={ {
            borderWidth: 1, borderRadius: 35, borderColor: colors.white,
          } }
          innerCircleStyle={ {
            borderColor: colors.white,
          } }
          switchLeftPx={ 2 } // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={ 2 } // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={ 2 } // multipled by the `circleSize` prop to calculate total width of the Switch
          switchBorderRadius={ 30 }
          onValueChange={ this.switchChange }
          value={ isEnabled }
        />
        { this.renderFlash() }
        { this.renderExposure() }

        { this.renderGallery() }
      </View>

      { this.renderColorViewList() }
    </View>);
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  imgPreview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'contain',
    backgroundColor: colors.black,
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
  icon: {
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
  sliderContainer: {
    position: 'absolute',
    bottom: deviceHeight / 5,
    width: deviceWidth,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  sliderText: {
    position: 'absolute',
    top: 0,
    width: 30,
    // left: (deviceWidth/2)-5,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  point: {
    position: 'absolute',
    // borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    height: 20,
    width: 20,
    backgroundColor: '#F43E3E',
  },
  middlePoint: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderWidth: 15,
    borderRadius: 50,
    borderColor: '#d1c1b6',
    opacity: 0.8,
  },
  upperPoint: {
    position: 'absolute',
    top: deviceHeight / 5 - 20,
    left: deviceWidth / 2 - 20,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
  },
});

ScanScreen.propTypes = {
  navigation: PropTypes.any,
};
