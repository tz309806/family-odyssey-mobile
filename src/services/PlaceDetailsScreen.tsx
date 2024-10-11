import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const geoapifyKey = process.env.GEOAPIFY_KEY;

const PlaceDetailsScreen = ({route}: any) => {
  const {placeId} = route.params;
  const [placeDetails, setPlaceDetails] = useState<any>(null);

  useEffect(() => {
    const getPlaceDetails = async () => {
      try {
        const response = await axios.get(
          'https://api.geoapify.com/v2/place-details',
          {
            params: {
              id: placeId,
              apiKey: geoapifyKey,
            },
          },
        );
        setPlaceDetails(response.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    getPlaceDetails();
  }, [placeId]);

  if (!placeDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Details</Text>
      <Text>Name: {placeDetails.name}</Text>
      <Text>
        Address: {placeDetails.properties.street},{' '}
        {placeDetails.properties.city}, {placeDetails.properties.state}
      </Text>
      <Text>Phone: {placeDetails.properties.phone || 'N/A'}</Text>
      <Text>Website: {placeDetails.properties.website || 'N/A'}</Text>
      {/* Add other details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PlaceDetailsScreen;
