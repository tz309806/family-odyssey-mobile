import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GeoapifySearchBoxComponent from '../../services/GeoapiFySearchBoxComponent.tsx';
import PlaceResultsScreen from '../PlaceResultsScreen/PlaceResultsScreen';
import PoiDetails from '../POIDetails/PoiDetails';
import ImageGalleryScreen from '../../components/POI-image-components/ImageGalleryScreen';
import MustKnowDetails from '../POIMustKNow/POIMustKNow.tsx';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents.tsx';

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator initialRouteName="GeoapifySearchBox">
      <Stack.Screen
        name="GeoapifySearchBox"
        component={GeoapifySearchBoxComponent}
        options={{
          title: 'Search', // Main search screen title
        }}
      />
      <Stack.Screen
        name="PlaceResultsScreen"
        component={PlaceResultsScreen}
        options={{
          title: 'Search Results',
          headerBackTitleVisible: false, // Hide back title
          headerTitle: '', // Remove title from header
        }}
      />
      <Stack.Screen
        name="PoiDetails"
        component={PoiDetails}
        options={{
          headerBackTitleVisible: false, // Hide back title
          headerTitle: '', // Remove title from header
        }}
      />
      <Stack.Screen
        name="ImageGalleryScreen"
        component={ImageGalleryScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MustKnowDetails"
        component={MustKnowDetails}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="UpcomingEvents"
        component={UpcomingEvents}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Search;
