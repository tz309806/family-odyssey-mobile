import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const geoapifyKey = process.env.GEOAPIFY_KEY;

const categories = [
  { label: 'Accommodation', value: 'accommodation' },
  { label: 'Airport', value: 'airport' },
];

const GeoapiFySearchBoxComponent = () => {
  const DEFAULT_COORDINATE = [-82.767064, 40.011767];
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // New state to track whether a search has been made
  const navigation = useNavigation();

  // Function to fetch places based on the selected category
  const getGeoapifyPlaces = async (selectedCategory) => {
    setLoading(true);
    setSearched(true); // Set searched to true when search begins
    try {
      const response = await axios.get('https://api.geoapify.com/v2/places', {
        params: {
          categories: selectedCategory,
          filter: `circle:${DEFAULT_COORDINATE[0]},${DEFAULT_COORDINATE[1]},10000`,
          apiKey: geoapifyKey,
          limit: 10,
        },
      });

      if (response.data && response.data.features) {
        console.log('Places fetched:', response.data.features);
        setPlaces(response.data.features);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (item) => {
    setSelectedCategory(item.value);
    getGeoapifyPlaces(item.value);
  };

  // Navigate to the results screen automatically when places are loaded
  useEffect(() => {
    if (!loading && places.length > 0) {
      navigation.navigate('PlaceResultsScreen', { places });
    }
  }, [loading, places, navigation]);

  return (
      <SafeAreaView style={styles.container}>
        {/* Category dropdown */}
        <Dropdown
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select a Category"
            value={selectedCategory}
            onChange={handleCategorySelect}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Loading Indicator */}
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : searched && places.length === 0 ? ( // Only show the message if a search has been made and no places found
            <Text style={styles.noPlacesText}>
              No places found. Please select a different category.
            </Text>
        ) : null}
      </SafeAreaView>
  );
};

export default GeoapiFySearchBoxComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  noPlacesText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
