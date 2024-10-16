import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  Platform,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types';
import style from './style.ts';
import {checkUserSession, storeSession} from '../../services/authService';
import {supabase} from '../../supabaseClient.ts';
import globalStyle from '../../assets/styles/globalStyle.ts';
import Title from '../../components/Title/Title.tsx';
import Button from '../../components/Button/Button.tsx';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  setUser: (user: any) => void;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId: process.env.GOOGLE_CLIENT_ID,
      iosClientId: '',
    });
    checkUserSessionOnLoad();
  });

  const checkUserSessionOnLoad = async () => {
    const sessionUser = await checkUserSession();
    if (sessionUser) {
      props.setUser(sessionUser);
    }
  };

  const handleSignIn = async () => {
    setErrorMessage('');
    console.log(password);
    if (email.length < 2 || password.length < 8) {
      setErrorMessage('Invalid email or password');
    } else {
      const {error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) setErrorMessage('Invalid email or password');
    }

    // try {
    //   const response = await signIn(email, password);
    //   const session = response.data.session;
    //   await storeSession(session);
    //   console.log('handleSignIn session object', session);
    //   props.setUser(session.user);
    // } catch (error: any) {
    //   setErrorMessage('Invalid email or password');
    // }
    //}
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

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
        props.setUser(data.session.user);
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

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.pageBackground]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <TextInput
            style={style.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={globalStyle.marginBottom10}>
          <TextInput
            style={style.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        {errorMessage !== '' && (
          <Text style={[style.error, globalStyle.marginBottom24]}>
            {errorMessage}
          </Text>
        )}
        <View style={globalStyle.marginBottom24}>
          <Button title="Sign In" onPress={handleSignIn} isDisabled={false} />
        </View>
        {Platform.OS === 'android' ? (
          <GoogleSigninButton
            style={style.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
          />
        ) : (
          <View style={globalStyle.marginBottom24}>
            <Button
              title="Future Apple Sign in Button"
              onPress={() => console.log('Apple Sign in button pressed')}
              isDisabled={false}
            />
          </View>
        )}
        <Pressable
          style={style.signUpButton}
          onPress={() => props.navigation.navigate('Signup')}>
          <Title title="Don't have an account?" type={2} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
