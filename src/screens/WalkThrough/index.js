import React, { memo, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View, Text } from 'react-native';
import SvgHealer from '@svgs/WalkThought/SvgHealer';
import colors from '@ultis/colors';
import FONTS from '@ultis/fonts/index';

const WalkThrough = memo(() => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Text style={styles.txtSkip}>Skip!</Text>
      <SvgHealer />
      {/*<ScrollView*/}
      {/*  horizontal={true}*/}
      {/*  bounces={false}*/}
      {/*  pagingEnabled={true}*/}
      {/*  onScroll={Animated.event(*/}
      {/*    [{ nativeEvent: { contentOffset: { x: scrollX } } }],*/}
      {/*    { useNativeDriver: false },*/}
      {/*  )}>*/}
      {/*  {data.map((item, index) => {*/}
      {/*    return (*/}
      {/*      <WalkThroughScreen*/}
      {/*        title={item.title}*/}
      {/*        intro={item.intro}*/}
      {/*        image={item.img}*/}
      {/*        key={index}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ScrollView>*/}
      {/*<Dots scrollX={scrollX} />*/}
    </View>
  );
});

export default WalkThrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  txtSkip: {
    fontFamily: FONTS.POPPINS.SemiBold,
    fontSize: 12,
    color: colors.classicBlue,
  },
});
