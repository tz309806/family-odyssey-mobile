// import React from "react";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { SplashScreen } from "../Screens/onboarding";
// // import { ForgotPassword, Login, ResendEmail, SignUp, SignUpVerify } from "../Screens/authStack";
// import TabNavigator from "./TabNavigation";
// // import PersonalInfo from "../Screens/allScreens/PersonalInfo";
// // import EditProfile from "../Screens/allScreens/EditProfile";
// // import ChangePassword from "../Screens/allScreens/ChangePassword";
// // import PolicyScreen from "../Screens/allScreens/PolicyScreen";
// // import TermsScreen from "../Screens/allScreens/TermsScreen";
// // import RateUsScreen from "../Screens/allScreens/RateUsScreen";
// // import CheckoutScreen from "../Screens/allScreens/CheckoutScreen";
// // import PayCheckout from "../Screens/allScreens/PayCheckout";
// // import PaymentInfo from "../Screens/allScreens/PaymentInfo";
// // import PaymentSuccess from "../Screens/allScreens/PaymentSuccess";
// // import FaqScreen from "../Screens/allScreens/FaqScreen";
// // import SupportChat from "../Screens/allScreens/SupportChat";
// // import UserScreen from "../Screens/allScreens/tabScreens/UserScreen";
// // import { Home, SettingsScreen } from "../Screens/allScreens/tabScreens";
// // import Notification from "../Screens/allScreens/Notification";
// // import TermsSignature from "../Screens/allScreens/TermsSignature";
// // import Verification from "../Screens/allScreens/Verification";
//
// const StackNavigation = () => {
//     // const [user, setUser] = useContext(AppContext);
//     const Stack = createNativeStackNavigator();
//
//     return (
//         <Stack.Navigator
//             initialRouteName={ROUTE_NAMES.SplashScreen}
//             screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal'}} >
//             {/* {user?.isLoggedIn? <> */}
//                 <Stack.Screen name={ROUTE_NAMES.TabNavigator} component={TabNavigator} />
//                 <Stack.Screen name={ROUTE_NAMES.PersonalInfo} component={PersonalInfo} />
//                 <Stack.Screen name={ROUTE_NAMES.EditProfile} component={EditProfile} />
//                 <Stack.Screen name={ROUTE_NAMES.ChangePassword} component={ChangePassword} />
//                 <Stack.Screen name={ROUTE_NAMES.PolicyScreen} component={PolicyScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.TermsScreen} component={TermsScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.RateUsScreen} component={RateUsScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.CheckoutScreen} component={CheckoutScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.PayCheckout} component={PayCheckout} />
//                 <Stack.Screen name={ROUTE_NAMES.PaymentInfo} component={PaymentInfo} />
//                 <Stack.Screen name={ROUTE_NAMES.SuccessfulPayment} component={PaymentSuccess} />
//                 <Stack.Screen name={ROUTE_NAMES.FaqScreen} component={FaqScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.SupportChat} component={SupportChat} />
//                 <Stack.Screen name={ROUTE_NAMES.SignUpVerify} component={SignUpVerify} />
//                 <Stack.Screen name={ROUTE_NAMES.UserScreen} component={UserScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.Home} component={Home} />
//                 <Stack.Screen name={ROUTE_NAMES.SettingsScreen} component={SettingsScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.Notification} component={Notification} />
//                 <Stack.Screen name={ROUTE_NAMES.SplashScreen} component={SplashScreen} />
//                 <Stack.Screen name={ROUTE_NAMES.Login} component={Login} />
//                 <Stack.Screen name={ROUTE_NAMES.ForgotPassword} component={ForgotPassword} />
//                 <Stack.Screen name={ROUTE_NAMES.ResendEmail} component={ResendEmail} />
//                 <Stack.Screen name={ROUTE_NAMES.SignUp} component={SignUp} />
//                 <Stack.Screen name={ROUTE_NAMES.TermsSignature} component={TermsSignature} />
//                 <Stack.Screen name={ROUTE_NAMES.Verification} component={Verification} />
//
//         </Stack.Navigator>
//     )
// }
//
// export default StackNavigation;
//
//
//
// export const ROUTE_NAMES ={
//     SplashScreen:"SplashScreen",
//     Login:"Login",
//     SignUp:"SignUp",
//     ForgotPassword:"ForgotPassword",
//     ResendEmail:"ResendEmail",
//     TabNavigator:'TabNavigator',
//     PersonalInfo:'PersonalInfo',
//     EditProfile:'EditProfile',
//     ChangePassword:'ChangePassword',
//     AboutTaskNChores:'AboutTaskNChores',
//     PolicyScreen:'PolicyScreen',
//     TermsScreen:'TermsScreen',
//     RateUsScreen:'RateUsScreen',
//     CheckoutScreen:'CheckoutScreen',
//     PayCheckout:'PayCheckout',
//     PaymentInfo:'PaymentInfo',
//     SuccessfulPayment:'SuccessfulPayment',
//     FaqScreen:'FaqScreen',
//     SupportChat:'SupportChat',
//     SignUpVerify: 'SignUpVerify',
//     UserScreen: 'UserScreen',
//     Home: 'Home',
//     SettingsScreen: 'SettingsScreen',
//     Notification: 'Notification',
//     TermsSignature: 'TermsSignature',
//     Verification: 'Verification',
//     SubscriptionSuccess: 'SubscriptionSuccess',
// }
