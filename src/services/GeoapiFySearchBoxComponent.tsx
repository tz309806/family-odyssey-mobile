import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../AppContext';
import {normalize} from 'normalizr';
import {placeSchema} from '../services/schemas';

const geoapifyKey = process.env.GEOAPIFY_KEY;

const categories = [
  {label: 'Accommodation', value: 'accommodation'},
  {label: 'Airport', value: 'airport'},
];

const GeoapiFySearchBoxComponent = () => {
  const DEFAULT_COORDINATE = [-82.767064, 40.011767];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const {setPlaces, places} = useAppContext(); // Access context to set places
  const navigation = useNavigation(); // Access navigation

  // Function to fetch and normalize places
  const getGeoapifyPlaces = async selectedCategory => {
    setLoading(true);
    setSearched(true);
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
        // Flatten properties and map place_id
        const placesWithId = response.data.features.map(feature => ({
          ...feature.properties, // Spread properties to the top level
          geometry: feature.geometry, // Retain geometry if needed
          place_id: feature.properties.place_id, // Ensure place_id is at the top level
        }));

        // Normalize the data
        const normalizedData = normalize(placesWithId, [placeSchema]);

        const placeIds = Object.keys(normalizedData.entities.places || {});

        setPlaces(normalizedData); // Set places in the context
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = item => {
    setSelectedCategory(item.value);
    getGeoapifyPlaces(item.value); // Fetch places when category is selected
  };

  // This effect runs when places are updated and navigates to PlaceResultsScreen if places are available
  useEffect(() => {
    if (!loading && places && Object.keys(places).length > 0) {
      navigation.navigate('PlaceResultsScreen'); // Navigate to PlaceResultsScreen when places are loaded
    }
  }, [places, loading, navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : searched && Object.keys(places).length === 0 ? (
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
