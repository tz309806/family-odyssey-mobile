import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Signup from '../screens/Signup/Signup';
import Search from '../screens/Search/Search';
import Inbox from '../screens/Inbox/Inbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSearch, faInbox} from '@fortawesome/free-solid-svg-icons';
import Login from "../screens/Login/Login.tsx";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faHome} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faSearch} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faInbox} />,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
