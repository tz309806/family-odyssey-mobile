import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useAppContext} from '../../AppContext'; // Import AppContext
import {useNavigation} from '@react-navigation/native'; // Import navigation

const PlaceResultsScreen = () => {
  const {places, placeIds} = useAppContext(); // Access places and placeIds from AppContext
  const [loading, setLoading] = useState(false); // To show loading state
  const navigation = useNavigation(); // Access navigation

  // Function to handle navigation to PoiDetails when a place is clicked
  const handlePlaceSelect = place => {
    // Navigate to PoiDetails and pass the selected place data
    navigation.navigate('PoiDetails', {place});
  };

  // Render individual place items
  const renderPlaceItem = ({item}) => {
    const place = places[item]; // Get the place object by its ID

    return (
      <TouchableOpacity
        style={styles.placeItem}
        onPress={() => handlePlaceSelect(place)} // Navigate to PoiDetails when item is clicked
      >
        <Text style={styles.placeName}>{place.name || `Place ${item}`}</Text>
        <Text>{place.formatted || 'No address available'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={placeIds} // Iterate over placeIds
        keyExtractor={item => item}
        renderItem={renderPlaceItem}
        ListEmptyComponent={
          <Text style={styles.noPlacesText}>No places found.</Text>
        }
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
};

export default PlaceResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  placeItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  noPlacesText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
