import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import SearchAutocomplete from './SearchAutocomplete.tsx';

const MapScreen = () => {
  const DEFAULT_COORDINATE = [-74.006, 40.7128]; // Default to New York City

  const [location, setLocation] = useState(DEFAULT_COORDINATE);

  useEffect(() => {
    // Enable logging
    Mapbox.setAccessToken(process.env.MAPBOX_TOKEN).then(res => {
      console.log('sdasdfsfsdf0', process.env.MAPBOX_TOKEN);
    });
  }, []);

  const handleSelectLocation = selectedLocation => {
    setLocation(selectedLocation.geometry.coordinates);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchAutocomplete onSelectLocation={handleSelectLocation} />
      </View>

        <View style={styles.container}>
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street} // Example of setting a style URL
            style={styles.map}
            onMapLoadingError={error => console.log('Map loading error:', error)}
            onMapError={error => console.log('Map error:', error)}
            onMapLoad={() => console.log('Map loaded')}
          >
            <Mapbox.Camera zoomLevel={14} centerCoordinate={location} />
          </Mapbox.MapView>
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

  mapContainer: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

export default MapScreen;
