import React, {useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types';
import style from './style.ts';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // replace with your web client ID
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened:', error);
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={style.input}
        placeholder="email"
        keyboardType="email-address"
      />
      <TextInput style={style.input} placeholder="password" secureTextEntry />
      <GoogleSigninButton
        style={style.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={style.signupText}>Go to Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
