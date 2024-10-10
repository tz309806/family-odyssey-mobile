import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Signup from '../screens/Signup/Signup';
import Search from '../screens/Search/Search';
import Inbox from '../screens/Inbox/Inbox';
import PlaceDetailsScreen from '../screens/Reviews/PlaceDetailsScreen.tsx'; // Import your screen here
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSearch, faInbox} from '@fortawesome/free-solid-svg-icons';
import Login from '../screens/Login/Login.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {useAppContext} from '../AppContext';
import PlaceResultsScreen from '../screens/PlaceResultsScreen/PlaceResultsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for the Bottom Tabs
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
        component={Search} // Make sure Search is part of the stack
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

// Stack Navigator for Auth (Login/Signup)
const AuthStack = () => {
  const {setUser} = useAppContext();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
        {props => <Login {...props} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

// Main Root Navigator to handle the auth state and app navigation
const RootNavigator = () => {
  const {user} = useAppContext();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}} // Hide header for tabs
          />
          {/* Adding PlaceDetailsScreen and other stack navigations */}
          {/*<Stack.Screen*/}
          {/*  name="PlaceDetailsScreen"*/}
          {/*  component={PlaceDetailsScreen}*/}
          {/*  options={{title: 'Place Details'}} // Optionally set header*/}
          {/*/>*/}
          {/*<Stack.Screen*/}
          {/*  name="PlaceResultsScreen"*/}
          {/*  component={PlaceResultsScreen}*/}
          {/*  options={{title: 'Places Results', tabBarVisible: false}} // Hide bottom tabs*/}
          {/*/>*/}
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
