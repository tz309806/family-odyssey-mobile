import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types';
import style from './style.ts';
import {
  checkUserSession,
  storeSession,
  clearSession,
  signIn,
  signInWithGoogle,
} from '../../services/authService';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../supabaseClient.js';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Login = ({setUser}: {setUser: (user: any) => void}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId: process.env.GOOGLE_CLIENT_ID, // replace with your Android client ID
    });
    checkUserSessionOnLoad();
  }, []);

  const checkUserSessionOnLoad = async () => {
    const sessionUser = await checkUserSession();
    console.log('checkUserSessionOnLoad ', sessionUser);
    if (sessionUser) {
      setUser(sessionUser);
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs', params: {tab: 'Home'}}],
      });
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn(email, password);
      const session = response.data.session;
      await storeSession(session);
      console.log('handleSignIn session object', session);
      setUser(session.user);
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs', params: {tab: 'Home'}}],
      });
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Something went wrong',
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('GoogleSignin USERINFO:', userInfo);

      if (userInfo.idToken) {

        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        if (error) {
          console.error('Supabase sign-in error:', error);
          throw new Error(error.message);
        }
        console.log('handleGoogleSignIn Supabase User data:', data);
        await storeSession(data.session);
        setUser(data.session.user);
        navigation.reset({
          index: 0,
          routes: [{name: 'Tabs', params: {tab: 'Home'}}],
        });
      } else {
        throw new Error('No ID token present!');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Some other error happened:', error);
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      await clearSession();
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={style.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <GoogleSigninButton
        style={style.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={style.signupText}>Go to Sign Up</Text>
      </Pressable>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default Login;
