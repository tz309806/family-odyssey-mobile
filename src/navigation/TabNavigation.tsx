// import React, { useEffect } from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Image, StyleSheet, Alert, BackHandler } from "react-native";
// import {
//     AvailableCars,
//     KeysScreen,
//     PerformScreen,
//     SettingsScreen,
//     Home,
//     UserScreen
// } from "../Screens/allScreens/tabScreens";
// import { imgUrl } from "../constant";
// import Fontf from "../constant/Fontsf";
// import KeyScreensRout from "./KeyScreenRout";
// import TabSubscription from "../Screens/allScreens/tabScreens/TabSubscription";
//
// const Tab = createBottomTabNavigator();
//
// const TabNavigator = ({ route, navigation, ...props }) => {
//     useEffect(() => {
//         const backAction = () => {
//             const routes = navigation.getState()?.routes;
//
//             if ((routes.length > 1 && routes[0]?.name != 'Login') && (routes.length > 2 && routes[routes.length - 2]?.name != 'Login')) return;
//
//             Alert.alert('Tap OK to exit app.', '', [
//                 {
//                     text: 'Cancel',
//                     onPress: () => null,
//                     style: 'cancel',
//                 },
//                 {text: 'OK', onPress: () => BackHandler.exitApp()},
//             ]);
//             return true;
//         };
//
//         const backHandler = BackHandler.addEventListener(
//             'hardwareBackPress',
//             backAction,
//         );
//
//         return () => backHandler.remove();
//     }, []);
//
//     return (
//         <Tab.Navigator
//             initialRouteName={route.params?.tab || TAB_ROUTES.AvailableCars}
//             screenOptions={{
//                 tabBarActiveTintColor: '#57E667',
//                 tabBarInactiveTintColor: "red",
//                 tabBarLabelStyle: { fontSize: 16 },
//                 tabBarStyle: styles.tabBarStyle,
//             }}>
//             {props.component && <Tab.Screen
//                 name={props.name + ' Screen'}
//                 component={props.component}
//                 options={{
//                     tabBarItemStyle: styles.tabBarItemStyle,
//                     tabBarLabel: props.name,
//                     headerShown: false,
//                     tabBarLabelStyle: styles.tabBarLabelStyle,
//                     tabBarIcon: ({ focused }) => <Image style={focused ? styles.iconFocus : styles.icon} source={imgUrl.eye} />,
//                 }} />}
//             <Tab.Screen
//                 name={TAB_ROUTES.Home}
//                 component={Home}
//                 options={{
//                     tabBarItemStyle: styles.tabBarItemStyle,
//                     tabBarLabel: ' ',
//                     headerShown: false,
//                     tabBarLabelStyle: styles.tabBarLabelStyle,
//                     tabBarIcon: ({ focused }) => <Image style={focused ? styles.iconFocus : styles.icon} source={imgUrl.homeActiveIcon} />,
//                 }} />
//
//             <Tab.Screen
//                 name={TAB_ROUTES.TabSubscription}
//                 component={TabSubscription}
//                 options={{
//                     tabBarItemStyle: styles.tabBarItemStyle,
//                     tabBarLabel: ' ',
//                     headerShown: false,
//                     tabBarLabelStyle: styles.tabBarLabelStyle,
//                     tabBarIcon: ({ focused }) => <Image style={focused ? styles.iconFocus : styles.icon} source={imgUrl.car_Grey} />,
//                 }} />
//           <Tab.Screen
//             name={TAB_ROUTES.KeyScreensRout}
//             component={KeyScreensRout}
//             options={{
//               tabBarItemStyle: styles.tabBarItemStyle,
//               tabBarLabel: 'Keys',
//               headerShown: false,
//               tabBarLabelStyle: styles.tabBarLabelStyle,
//               tabBarIcon: ({ focused }) => { return <Image style={[focused ? styles.iconFocus : styles.icon]} source={imgUrl.keyIcon} /> },
//             }} />
//             <Tab.Screen
//                 name={TAB_ROUTES.UserScreen}
//                 component={UserScreen}
//                 options={{
//                     tabBarItemStyle: styles.tabBarItemStyle,
//                     tabBarLabel: ' ',
//                     headerShown: false,
//                     tabBarLabelStyle: styles.tabBarLabelStyle,
//                     tabBarIcon: ({ focused }) => <Image style={focused ? styles.iconFocus : styles.icon} source={imgUrl.User_Icon} />,
//                 }} />
//         </Tab.Navigator>
//     );
// };
//
// export default TabNavigator;
//
// const styles = StyleSheet.create({
//     tabBarStyle: {
//         display: 'flex',
//         backgroundColor: '#191919',
//         overflow: 'hidden',
//         height: 52,
//         borderColor: '#191919',
//         borderWidth: 0,
//     },
//     tabBarItemStyle: {
//         height: 52,
//         paddingVertical: 25,
//     },
//     tabBarLabelStyle: { fontSize: 12, fontWeight: '300', lineHeight: 16, fontFamily: Fontf.Dm_Medium, color: "#8F9A90" },
//     icon: { height: 25, width: 25, tintColor: '#8F9A90' },
//     iconFocus: { height: 25, width: 25, tintColor: '#57E667' },
// });
//
// export const TAB_ROUTES = {
//     Home: "Home",
//     AvailableCars: "AvailableCars",
//     KeysScreen: "KeysScreen",
//     PerformScreen: "PerformScreen",
//     UserScreen: "UserScreen",
//     // SettingsScreen: "SettingsScreen",
//   ConnectedCar: "ConnectedCar",
//   KeyScreensRout: "KeyScreensRout",
//     TabSubscription: "TabSubscription"
// }
