import React from 'react';
import {RootStackParamList} from './route-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOut} from '@fortawesome/free-solid-svg-icons';
import TabNavigator from './TabNavigation.tsx';
import Search from '../screens/Search/Search.tsx';
import Inbox from '../screens/Inbox/Inbox.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => {
  return <TabNavigator />;
};

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const LogoutIcon = () => <FontAwesomeIcon icon={faSignOut} color="red" />;

export const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={LogoutIcon}
        onPress={() => {
          console.log('Logout');
        }}
      />
    </DrawerContentScrollView>
  );
};
