import React, {useState, useEffect, useCallback} from 'react';
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
import {signIn} from '../../services/authService';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
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
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: 'YOUR_WEB_CLIENT_ID', // replace with your web client ID
  //   });
  // }, []);

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      console.log('User signed in: ', user);
      setUser(user); // Update the user state in the App component
      // Alert.alert('Success', 'Signed in successfully');
      // Navigate to the Tabs navigator
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

  useEffect(() => {
    setEmail('tz309806@gmail.com');
    setPassword('T64220866s!');
  }, []);

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
    </SafeAreaView>
  );
};

export default Login;
