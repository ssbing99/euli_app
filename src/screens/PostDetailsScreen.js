import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnHeight,
  deviceWidth,
  colors,
  borderRadius,
} from '../styles/variables';
import { postAvaImg } from '../styles/image-variables';
import SocialList from './post-detail/SocialList';
import RelatePost from './post-detail/RelatePost';
import ProductOnPost from './post-detail/ProductOnPost';

export default class PostDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props.navigation;
    const backBtnSetting = {
      btnWidth: responsiveWidth(37.33),
      btnHeight: btnHeight,
      color: 'rgb(150,150,150)',
      borderColor: 'rgb(150,150,150)',
      backgroundColor: colors.white,
      style: {
        borderWidth: 1,
        borderRadius: borderRadius.backNextBtn,
      },
    };

    const nextBtnSetting = {
      btnWidth: responsiveWidth(37.33),
      btnHeight: btnHeight,
      color: colors.black,
      backgroundColor: colors.white,
      style: {
        borderWidth: 1,
        borderRadius: borderRadius.backNextBtn,
      },
    };

    return (
      <View style={CommonStyles.container}>
        <ScrollView>
          {/* post image start here */}
          <Image
            source={{ uri: state.params.image }}
            style={{ width: deviceWidth, height: deviceWidth * 1.25 }}>
            <NavigationBar
              back
              navigation={this.props.navigation}
              statusBarProps={{
                translucent: true,
                barStyle: 'light-content',
                backgroundColor: 'transparent',
              }}
              outerContStyle={{
                backgroundColor: 'transparent',
              }}
            />
          </Image>
          {/* post image start here */}

          {/* post content start here */}
          <View style={styles.postContent}>
            <Text large black regular>
              {state.params.title}
            </Text>
            <Text gray small regular style={styles.createdDate}>
              {state.params.createdDate}
            </Text>
            <Text
              normal
              regular
              style={{ color: 'rgb(59,59,59)', lineHeight: 32 }}>
              The most common alloys added to gold to produce white gold are
              nickel, palladium and silver. Most white gold jewelry is also
              given an electroplated rhodium coating to intensify brightness.
            </Text>
          </View>
          <Border bottom width={responsiveWidth(93.6)} alignSelf="flex-end" />
          {/* post content end here */}

          {/* social start here */}
          <SocialList />
          {/* social end here */}

          {/* post author start here */}
          <View style={styles.author}>
            <View style={styles.base}>
              <Text
                black
                semiBold
                large
                style={{ marginTop: spaceVertical.small / 2 }}>
                Gordon Rivera
              </Text>
              <Text gray normal regular>
                Design at Moon
              </Text>
            </View>
            <View style={styles.authorAva}>
              <Image
                source={{ uri: 'https://goo.gl/TU8XPM' }}
                style={{
                  width: postAvaImg.width,
                  height: postAvaImg.height,
                  ...Platform.select({
                    android: {
                      borderRadius: postAvaImg.width,
                    },
                  }),
                }}
              />
            </View>
          </View>
          {/* post author end here */}

          {/* product on post start here */}
          <ProductOnPost />
          {/* product on post end here */}

          {/* relate post start here */}
          <RelatePost />
          {/* relate post end here */}

          {/* bottom button start here */}
          <View style={styles.btnCont}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={backBtnSetting}
              btnText="BACK"
            />
            <PrimeButton
              navigation={this.props.navigation}
              setting={nextBtnSetting}
              btnText="NEXT"
            />
          </View>
          {/* bottom button end here */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContent: {
    margin: marginHorizontal.semiSmall,
  },
  createdDate: {
    marginTop: spaceVertical.small / 2,
    marginBottom: responsiveHeight(3.1),
  },
  author: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: responsiveHeight(5.99),
    marginHorizontal: responsiveWidth(5.33),
  },
  authorAva: {
    position: 'absolute',
    width: postAvaImg.width,
    height: postAvaImg.height,
    borderRadius: postAvaImg.height,
    overflow: 'hidden',
  },
  base: {
    width: deviceWidth - responsiveWidth(5.33) * 2,
    alignItems: 'center',
    marginTop: responsiveHeight(5.99),
    paddingTop: 48,
    paddingBottom: spaceVertical.small,
    borderWidth: 1,
    borderColor: 'rgb(217,217,217)',
    borderRadius: borderRadius.normal,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spaceVertical.large,
    marginHorizontal: marginHorizontal.semiSmall,
  },
});

PostDetailsScreen.propTypes = {
  navigation: PropTypes.any,
};
