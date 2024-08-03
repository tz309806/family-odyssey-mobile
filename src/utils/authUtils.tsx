// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {supabase} from "../supabaseClient.js";
// import {Alert} from "react-native";
// import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
// import {signIn} from "../services/authService.ts";
//
// export const checkUserSession = async () => {
//   const session = await getSession();
//   if (session && session.accessToken) {
//     const {data, error} = await supabase.auth.getUser();
//     if (data.user) {
//       setUser(data.user);
//     } else if (error) {
//       console.error('Error getting user:', error);
//     }
//   }
// };
//
// export const storeSession = async session => {
//   try {
//     await AsyncStorage.setItem('access_token', session.access_token);
//     await AsyncStorage.setItem('refresh_token', session.refresh_token);
//     await AsyncStorage.setItem('user', JSON.stringify(session.user));
//   } catch (error) {
//     console.error('Error storing session', error);
//   }
// };
//
// export const getSession = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('access_token');
//     const refreshToken = await AsyncStorage.getItem('refresh_token');
//     const user = await AsyncStorage.getItem('user');
//     return {
//       accessToken,
//       refreshToken,
//       user: user ? JSON.parse(user) : null,
//     };
//   } catch (error) {
//     console.error('Error retrieving session', error);
//     return null;
//   }
// };
//
// export const handleSignIn = async () => {
//   try {
//     const user = await signIn(email, password);
//     setUser(user.data);
//     await storeSession(user.data.session);
//     navigation.reset({
//       index: 0,
//       routes: [{name: 'Tabs', params: {tab: 'Home'}}],
//     });
//   } catch (error) {
//     Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
//   }
// };
//
// export const handleGoogleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     console.log('USERINFO:', userInfo);
//
//     if (userInfo.idToken) {
//       const {data, error} = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: userInfo.idToken,
//       });
//       if (error) {
//         console.error('Supabase sign-in error:', error);
//         throw new Error(error.message);
//       }
//       console.log('Supabase data:', data);
//       await storeSession(data.session);
//       setUser(data.session.user);
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'Tabs', params: {tab: 'Home'}}],
//       });
//     } else {
//       throw new Error('No ID token present!');
//     }
//   } catch (error: any) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       console.log('User cancelled the login flow');
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       console.log('Sign in is in progress already');
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       console.log('Play services not available or outdated');
//     } else {
//       console.error('Some other error happened:', error);
//       Alert.alert('Error', error.message || 'Something went wrong');
//     }
//   }
// };
//
// export const handleSignOut = async () => {
//   const {error} = await supabase.auth.signOut();
//   if (error) {
//     console.error('Error signing out:', error);
//   } else {
//     await clearSession();
//     setUser(null);
//     navigation.reset({
//       index: 0,
//       routes: [{name: 'Login'}],
//     });
//   }
// };
//
// export const clearSession = async () => {
//   try {
//     await AsyncStorage.removeItem('access_token');
//     await AsyncStorage.removeItem('refresh_token');
//     await AsyncStorage.removeItem('user');
//     setUser(null);
//   } catch (error) {
//     console.error('Error clearing session', error);
//   }
// };
