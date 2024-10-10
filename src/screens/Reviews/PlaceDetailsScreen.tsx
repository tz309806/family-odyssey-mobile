// PlaceDetailsScreen.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PlaceDetailsScreen = ({route}) => {
  const {placeName} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for: {placeName}</Text>
      <Text style={styles.review}>
        Hardcoded Review: This is a great place!
      </Text>
      <Text style={styles.review}>Hardcoded Review: Very family-friendly!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  review: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default PlaceDetailsScreen;
