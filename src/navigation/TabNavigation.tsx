// TabNavigation.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseChimney, faMagnifyingGlassLocation, faInbox} from '@fortawesome/free-solid-svg-icons';
import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search.tsx';
import Inbox from '../screens/Inbox/Inbox.tsx';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = faHouseChimney;
          } else if (route.name === 'Search') {
            iconName = faMagnifyingGlassLocation;
          } else if (route.name === 'Inbox') {
            iconName = faInbox;
          }

          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Inbox" component={Inbox} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
