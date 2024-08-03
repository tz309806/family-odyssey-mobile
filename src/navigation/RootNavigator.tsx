import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Signup from '../screens/Signup/Signup';
import Search from '../screens/Search/Search';
import Inbox from '../screens/Inbox/Inbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSearch, faInbox} from '@fortawesome/free-solid-svg-icons';
import Login from '../screens/Login/Login.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {useAppContext} from '../AppContext';

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

const RootNavigator = () => {
  const {user, setUser} = useAppContext();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
