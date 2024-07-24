import React from 'react';
import {RootStackParamList} from './route-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOut} from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

export const MainNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name={'Home'} component={Home} />
    </Drawer.Navigator>
  );
};

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Drawer'}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name="Drawer" component={MainNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const LogoutIcon = () => <FontAwesomeIcon icon={faSignOut} color={'red'} />;

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
