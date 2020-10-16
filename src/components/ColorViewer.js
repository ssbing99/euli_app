import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default class ColorViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, onPressItem, imgWidth = 45, imgHeight = 45 } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.card,
          {
            width: imgWidth,
            height: imgHeight,
            backgroundColor: color,
          },
        ]}
        onPress={onPressItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

ColorViewer.propTypes = {
  onPressItem: PropTypes.any,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  color: PropTypes.string.isRequired,
};
