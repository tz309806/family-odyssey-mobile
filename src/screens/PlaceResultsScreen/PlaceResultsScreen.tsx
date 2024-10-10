import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const PlaceResultsScreen = ({route}) => {
  const {places} = route.params;

  const renderPlaceItem = ({item, index}) => (
    <TouchableOpacity style={styles.placeItem}>
      <Text style={styles.placeName}>
        {item.properties.name || `Place ${index + 1}`}
      </Text>
      <Text>{item.properties.formatted || 'No address available'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item, index) =>
          item.properties.place_id || index.toString()
        }
        renderItem={renderPlaceItem}
        ListEmptyComponent={
          <Text style={styles.noPlacesText}>No places found.</Text>
        }
      />
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
