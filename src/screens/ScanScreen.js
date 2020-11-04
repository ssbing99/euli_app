import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from '../styles/CommonStyles';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import GetPixelColor from 'react-native-get-pixel-color';
import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import { RNCamera } from 'react-native-camera';
import {
  isIOS,
  colors,
  deviceWidth,
  deviceHeight,
  responsiveHeight,
  responsiveWidth,
} from '../styles/variables';
import { Switch } from 'react-native-switch';
import ColorViewer from '@components/ColorViewer';

/*
* https://github.com/herbert84/react-native-pixel-color-picker/blob/master/src/ColorPicker.android.js
*
* https://github.com/dudyn5ky1/react-native-get-pixel-color
* */

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainView: {height: deviceHeight, width: deviceWidth},
      width: deviceWidth,
      height: deviceHeight,
      isEnabled: false,
      circleDisplay: 'none',
      points: [],
      capColor : colors.transparent,
      capImage: {},
      origin: {}
    };
  }

  componentWillUnmount() {
    console.log("reset")
    this.state = {
      mainView: {height: deviceHeight, width: deviceWidth},
      width: deviceWidth,
      height: deviceHeight,
      isEnabled: false,
      circleDisplay: 'none',
      points: [],
      capColor : colors.transparent,
      capImage: {},
      origin: {}
    };
  }

  // getPointsInCircle (x, y, radius) {
  //   let newPoints = [];
  //   //将圆周均分8块，每45弧度取点坐标，理论上覆盖圆周
  //   for (var i = 0; i < 8; i++) {
  //     var pX = x + Math.sin(2 * Math.PI / 360 * 45 * i) * radius;
  //     var pY = y + Math.cos(2 * Math.PI / 360 * 45 * i) * radius;
  //     newPoints.push({
  //       X_COORDINATE: pX,
  //       Y_COORDINATE: pY
  //     });
  //   }
  //   console.log(newPoints);
  //   this.setState({ points : newPoints})
  //   return newPoints;
  // }

  // renderPoints () {
  //   let pointsContainer = [];
  //   for (var i in this.state.points) {
  //     let left = this.getPixelByPercentage(this.state.points[i].X_COORDINATE, this.state.width) - 10;
  //     let top = this.getPixelByPercentage(this.state.points[i].Y_COORDINATE, this.state.height) - 10;
  //     let position = { top, left, offsetX: this.state.offsetX, offsetY: this.state.offsetY };
  //     pointsContainer.push(<View key={i} style={[styles.point, { top: this.state.points[i].Y_COORDINATE, left: this.state.points[i].X_COORDINATE }]} />);
  //
  //   }
  //   return (<View style={{ position: "absolute", top:0, left:0, backgroundColor: "transparent", width: this.state.width, height: this.state.height }}>{pointsContainer}</View>);
  // }

  getPercentageByPixel (pixel, widthOrHeight) {
    return (pixel / widthOrHeight) * 100;
  }

  getPixelByPercentage (percentage, widthOrHeight) {
    return (percentage / 100) * widthOrHeight;
  }

  hex2rgb (hex) {
    let rgb = ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    return `rgb(${rgb.join(',')})`;
  }

  getPixel(imageData, x, y){
    console.log(`getPixel: X = ${x}, Y = ${y}`);
    //
    GetPixelColor.setImage((isIOS ? imageData.uri : imageData.base64))
        .catch(err => {
          // Handle errors
          console.error(err);
        });

    GetPixelColor.pickColorAt(x, y)
        .then((color) => {
          console.log("COLOR", color);
          console.log("COLOR RGB", this.hex2rgb(color));
          this.setState({ capColor: color });

        })
        .catch(err => {
          // Handle errors
          console.error(err);
        });

  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      const size = await this.camera.getAvailablePictureSizes();

      console.log(size);
      console.log(data);
      await Image.getSize(data.uri, (width, height) => {
        console.log("W: ",(width));
        console.log("H: ",(height));
        this.setState({ capImage : { imageBase64: data.base64, width: width, height: height}});
      }).then(res => {

        let getPiX = this.getPixelByPercentage(50, this.state.capImage.width);
        let getPiY = this.getPixelByPercentage(50, this.state.capImage.height);

        console.log("getPiX",getPiX);
        console.log("getPiY",getPiY);

        // getPixel(imageData, X, Y) // but Y for X , X for Y
        this.getPixel(data, getPiY, getPiX);
      });

    }
  };

  onLayoutEvt = event => {
    const layout = event.nativeEvent.layout;
    // console.log('onLayoutEvt', layout);

    this.setState({origin: {x: layout.x, y: layout.y}});
  }

  render() {

    const { isEnabled } = this.state;

    return (
      <View ref={(ref) => {this.mainView = ref}} style={CommonStyles.container}
      onLayout={event =>{
        const layout = event.nativeEvent.layout;
        console.log('layout', layout);
        this.setState({ mainView: {height: layout.height, width: layout.width} });
      }}
      >
        {/* <NavigationBar navigation={this.props.navigation} /> */}
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          ratio={'4:3'}
          pictureSize={"640x480"}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View
            onLayout={this.onLayoutEvt}
            style={[styles.middlePoint, { top:(this.state.mainView.height/2)-20, left:(this.state.mainView.width/2)-20 }]} ></View>

        <View key={"origin"} style={[styles.upperPoint, {borderColor: this.state.capColor,backgroundColor: this.state.capColor}]} ></View>

        {/*<Image*/}
        {/*    source={{ uri: `data:image/png;base64,${this.state.capImage.imageBase64}`}}*/}
        {/*    style={{ top:(deviceHeight/5)-20, left:(deviceWidth/5)-20, height: '20%', width: '20%', position:'absolute' }}*/}
        {/*/>*/}

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
  point: {
    position: "absolute",
    // borderRadius: 20,
    borderWidth: 2,
    borderColor: "green",
    height: 20,
    width: 20,
    backgroundColor: "#F43E3E"
  },
  middlePoint: {
    position:'absolute',
    height:40,
    width:40,
    borderWidth:1,
    borderRadius: 20,
    borderColor:'#fff'
  },
  upperPoint: {
    position:'absolute',
    top:(deviceHeight/5)-20,
    left:(deviceWidth/2)-20,
    height:40,
    width:40,
    borderWidth:1,
    borderRadius: 20,
  },
});

ScanScreen.propTypes = {
  navigation: PropTypes.any,
};
