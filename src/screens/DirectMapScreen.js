import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
// import { MapView } from 'expo';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  colors,
  borderRadius,
} from '../styles/variables';
import { STORES } from '../static/data';

const imgWidth = responsiveWidth(80.8);
const imgHeight = imgWidth * 0.43;

export default class DirectMapScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar back navigation={this.props.navigation} title="MAPS" />

        {/* map start here */}
        {/* 
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        */}
        {/* map end here */}

        {/* stores list start here */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.cardsList}>
          <View style={styles.subCardsList}>
            {STORES.map((item, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={colors.lightGray}
                style={styles.card}
                onPress={() => this.props.navigation.navigate('DealScreen')}>
                <View>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text black normal mediumBold style={styles.storeName}>
                    {item.name}
                  </Text>
                  <Text gray small regular>
                    {item.address}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
        {/* stores list end here */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardsList: {
    position: 'absolute',
    bottom: spaceVertical.small,
    backgroundColor: 'transparent',
  },
  subCardsList: {
    flexDirection: 'row',
    marginHorizontal: marginHorizontal.small / 2,
  },
  card: {
    marginHorizontal: marginHorizontal.small / 2,
    padding: marginHorizontal.semiSmall / 2,
    borderRadius: borderRadius.normal,
    backgroundColor: colors.white,
  },
  image: {
    width: imgWidth,
    height: imgHeight,
    borderRadius: borderRadius.normal,
  },
  storeName: {
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(0.8),
  },
});

DirectMapScreen.propTypes = {
  navigation: PropTypes.any,
};
