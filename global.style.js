// GlobalStyle.js
import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

export const Text = props => (
  <RNText {...props} style={[styles.text, props.style]}>
    {props.children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
