// import React from 'react';
// import {RootStackParamList} from './route-types';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from '../screens/Login/Login';
// import Home from '../screens/Home/Home';
// import {
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from '@react-navigation/drawer';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faSignOut} from '@fortawesome/free-solid-svg-icons';
// import TabNavigator from './TabNavigation.tsx';
// import Search from '../screens/Search/Search.tsx';
// import Inbox from '../screens/Inbox/Inbox.tsx';
// import {createDrawerNavigator} from '@react-navigation/drawer';
//
// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Drawer = createDrawerNavigator();
//
// export const MainNavigation = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Search" component={Search} />
//       <Drawer.Screen name="Inbox" component={Inbox} />
//     </Drawer.Navigator>
//   );
// };
//
// export const NonAuthenticated = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Login"
//       screenOptions={{header: () => null, headerShown: false}}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Search" component={Search} />
//       <Stack.Screen name="Inbox" component={Inbox} />
//       <Stack.Screen name="TabNavigator" component={TabNavigator} />
//     </Stack.Navigator>
//   );
// };
//
// const LogoutIcon = () => <FontAwesomeIcon icon={faSignOut} color="red" />;
//
// export const CustomDrawerContent = (props: any) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Logout"
//         icon={LogoutIcon}
//         onPress={() => {
//           console.log('Logout');
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// };
