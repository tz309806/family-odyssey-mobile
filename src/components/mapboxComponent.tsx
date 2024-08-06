import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import MapboxGL, {MapView} from '@rnmapbox/maps';
import Mapbox from '@rnmapbox/maps';

const MapScreen = () => {
  useEffect(() => {
    // Enable logging
    MapboxGL.setAccessToken(process.env.MAPBOX_TOKEN).then(res => {
      console.log('sdasdfsfsdf0', process.env.MAPBOX_TOKEN);
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>THIS IS SEARCH PAGE</Text>
      {/*<View style={styles.page}>*/}
      {/*  <View style={styles.container}>*/}
      {/*    <MapView style={styles.map} />*/}
      {/*  </View>*/}
      {/*</View>*/}
      <View style={styles.page}>
        <View style={styles.container}>
          <Mapbox.MapView style={styles.map} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  container: {
    height: 300,

    width: 300,
  },

  map: {
    flex: 1,
  },
});

export default MapScreen;
