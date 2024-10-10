// import React, {useState, useRef} from 'react';
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import {AddressDetails} from '../model/address_details';
// import {
//   PG_getAddressByPlaceId,
//   PG_getReviewsByPlaceId,
//   putAddressDetails,
// } from './PGServices';
//
// const geoapifyKey = process.env.GEOAPIFY_KEY;
//
// const GeoapifyAutocomplete = () => {
//   const [query, setQuery] = useState<string>('');
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
//   const navigation = useNavigation();
//
//   const getGeoapifyAutocomplete = async (searchText: string) => {
//     try {
//       const response = await axios.get(
//         'https://api.geoapify.com/v1/geocode/autocomplete',
//         {
//           params: {
//             text: searchText,
//             apiKey: geoapifyKey,
//             limit: 5, // Limit the number of results
//           },
//         },
//       );
//
//       const suggestions = response.data.features.map((feature: any) => ({
//         name:
//           feature.properties.city || feature.properties.name || 'Unknown Place',
//         address: feature.properties.formatted,
//         coordinates: feature.geometry.coordinates,
//         fullData: feature, // Save the full feature object for later use
//       }));
//
//       setSuggestions(suggestions);
//     } catch (error) {
//       console.error('Error fetching autocomplete data:', error);
//     }
//   };
//
//   const getGeoapifyPlaceDetails = async placeId => {
//     try {
//       // Construct the Geoapify Place Details API URL
//       const response = await axios.get(
//         'https://api.geoapify.com/v2/place-details',
//         {
//           params: {
//             id: placeId, // Pass the placeId in the query parameter
//             apiKey: geoapifyKey, // Use the API key stored in the environment variable
//           },
//         },
//       );
//
//       // Handle the response data
//       const placeDetails = response.data;
//       console.log('Place Details:', placeDetails);
//
//       return placeDetails; // Return the place details if you want to use them elsewhere
//     } catch (error) {
//       console.error('Error fetching Geoapify place details:', error);
//       throw error; // Rethrow error if you want to handle it in the calling function
//     }
//   };
//
//   const handleInputChange = (text: string) => {
//     setQuery(text);
//
//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current); // Clear the previous timeout if it exists
//     }
//
//     if (text.length >= 4) {
//       // Only fetch suggestions after 4 characters
//       debounceTimeout.current = setTimeout(() => {
//         getGeoapifyAutocomplete(text);
//       }, 500); // 500ms delay
//     } else {
//       setSuggestions([]);
//     }
//   };
//
//   const handleSelectSuggestion = async (item: any) => {
//     try {
//       const placeId = item.fullData.properties.place_id;
//
//       // First check if address already exists in the database
//       const response = await PG_getAddressByPlaceId(placeId);
//       console.log('56757575675@@@@!!!!!!!!!!!!!!!');
//       if (response.status === 200) {
//         console.log('IN IF @@@@!!!!!!!!!!!!!!!');
//         const addressDetailsData = response.data;
//
//         if (
//           Array.isArray(addressDetailsData) &&
//           addressDetailsData.length === 0
//         ) {
//           // Fetch additional place details from Geoapify Place Details API
//           const placeDetails = await getGeoapifyPlaceDetails(placeId);
//
//           await saveAddressDetails(item, placeDetails);
//           Alert.alert(
//             "Oops! We don't have a review yet for this place.",
//             'Do you want to help out and create a review for the place?',
//             //todo: then user is led to the addReview screen
//           );
//         } else {
//           console.log(
//             'IN ESLE BLOCK@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
//           );
//           const reviews = await PG_getReviewsByPlaceId(placeId, 1);
//
//           navigation.navigate('ReviewDetailsScreen', {
//             placeName: item.name,
//             reviews, // Pass additional data as needed
//           });
//         }
//       }
//     } catch (e) {
//       Alert.alert('Error', 'There was an error, please try again later.');
//       console.error('Error in handleSelectSuggestion:', e);
//     }
//   };
//
//   const saveAddressDetails = async (item: any, placeDetails: any) => {
//     const addressDetails = new AddressDetails({
//       place_id: item.fullData.properties.place_id, // Required
//       name: item.fullData.properties.name || null,
//       house_number: item.fullData.properties.housenumber || null,
//       street: item.fullData.properties.street || null,
//       city: item.fullData.properties.city || null,
//       state: item.fullData.properties.state_code || null,
//       postcode: item.fullData.properties.postcode || null,
//       country_code: item.fullData.properties.country_code || null,
//       lat: item.coordinates[1] || null,
//       lon: item.coordinates[0] || null,
//       categories: placeDetails?.properties?.categories || null, // Categories from place details
//       phone: placeDetails?.properties?.contact?.phone || null, // Phone number from place details
//       smoking: placeDetails?.properties?.smoking || null, // Smoking policy from place details
//       takeaway: placeDetails?.properties?.takeaway || null, // Takeaway option from place details
//       delivery: placeDetails?.properties?.delivery || null, // Delivery option from place details
//       website: placeDetails?.properties?.website || null, // Website from place details
//       overall_family_friendliness_rating: null, // This can be set manually or from reviews
//       hours_of_operation: placeDetails?.properties?.opening_hours || null, // Hours of operation
//     });
//
//     try {
//       await putAddressDetails(addressDetails);
//       console.log('Address details saved successfully');
//     } catch (error) {
//       console.error('Error saving address details:', error);
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={query}
//         onChangeText={handleInputChange}
//         placeholder="Search for a location"
//       />
//       {suggestions.length > 0 && (
//         <View style={styles.dropdown}>
//           <FlatList
//             data={suggestions}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}) => (
//               <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
//                 <View style={styles.suggestionItem}>
//                   <Text style={styles.suggestionName}>{item.name}</Text>
//                   <Text style={styles.suggestionAddress}>{item.address}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 50, // Adjust this value based on the input height and margin
//     width: '100%',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     zIndex: 1000, // Ensure the dropdown appears above other elements
//   },
//   suggestionItem: {
//     padding: 10,
//     borderBottomColor: '#ddd',
//     borderBottomWidth: 1,
//   },
//   suggestionName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   suggestionAddress: {
//     color: 'gray',
//     fontSize: 14,
//   },
// });
//
// export default GeoapifyAutocomplete;
