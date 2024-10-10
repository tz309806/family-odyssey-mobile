import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Signup from '../screens/Signup/Signup';
import Search from '../screens/Search/Search';
import Inbox from '../screens/Inbox/Inbox';
import PlaceDetailsScreen from '../screens/Reviews/PlaceDetailsScreen.tsx'; // Import your screen here
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSearch,
  faInbox,
  faUser,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import Login from '../screens/Login/Login.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {useAppContext} from '../AppContext';
import PlaceResultsScreen from '../screens/PlaceResultsScreen/PlaceResultsScreen';
import Profile from '../screens/Profile/Profile.tsx';
import Settings from '../screens/Settings/Settings.tsx';
import {View} from 'react-native';
import style from './style.ts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for the Bottom Tabs
const HomeIcon = () => <FontAwesomeIcon icon={faHome} />;
const SearchIcon = () => (
  <View style={style.searchIcon}>
    <FontAwesomeIcon icon={faSearch} color="white" />
  </View>
);
const InboxIcon = () => <FontAwesomeIcon icon={faInbox} />;
const ProfileIcon = () => <FontAwesomeIcon icon={faUser} />;
const CogIcon = () => <FontAwesomeIcon icon={faCog} />;
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: InboxIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search} // Make sure Search is part of the stack
        options={{
          tabBarIcon: SearchIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: CogIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
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
  console.log('ROOT Nav', user);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}} // Hide header for tabs
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Edit Profile" component={Profile} />
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
