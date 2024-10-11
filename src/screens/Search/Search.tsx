import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GeoapifySearchBoxComponent from '../../services/GeoapiFySearchBoxComponent.tsx';
import PlaceResultsScreen from '../PlaceResultsScreen/PlaceResultsScreen'; // Import the results screen

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator initialRouteName="GeoapifySearchBox">
      <Stack.Screen
        name="GeoapifySearchBox"
        component={GeoapifySearchBoxComponent}
        options={{headerShown: false}} // Hide the header if needed
      />
      <Stack.Screen
        name="PlaceResultsScreen"
        component={PlaceResultsScreen}
        options={{title: 'Place Results'}}
      />
    </Stack.Navigator>
  );
};

export default Search;
