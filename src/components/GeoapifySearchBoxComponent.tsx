import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import GeoapifyAutocomplete from '../services/GeoapifyFetchAutocompleteService';

const GeoapFySearchBoxComponent: React.FC = () => {
  const DEFAULT_COORDINATE: [number, number] = [-74.006, 40.7128]; // Default to New York City

  const [location, setLocation] = useState<[number, number]>(DEFAULT_COORDINATE);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleSelectLocation = (selectedLocation: { lat: number; lon: number }) => {
    if (selectedLocation) {
      const { lat, lon } = selectedLocation;
      setLocation([lon, lat]); // Mapbox expects coordinates as [longitude, latitude]
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View>
          <GeoapifyAutocomplete onSelectLocation={handleSelectLocation} />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default GeoapFySearchBoxComponent;
