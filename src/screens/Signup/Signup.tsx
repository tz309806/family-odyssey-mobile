import React, {useState} from 'react';
import {SafeAreaView, TextInput, Button, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types.ts';
import style from './style';
import {supabase} from '../../supabaseClient.ts';
import globalStyle from '../../assets/styles/globalStyle.ts';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registration'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Signup = ({navigation}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');
    console.log(password);
    if (email.length < 2) {
      setErrorMessage('Invalid email');
    } else if (password.length < 8) {
      setErrorMessage('Password should be at least 8 characters');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log('data', data);
      if (error) {
        setErrorMessage('Invalid email or password');
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={style.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={style.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        style={style.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errorMessage !== '' && (
        <Text style={[style.error, globalStyle.marginBottom24]}>
          {errorMessage}
        </Text>
      )}
      <Text style={style.text}>
        By signing up you agree to the terms of use and privacy policy
      </Text>
      <Button title="Sign Up" onPress={handleSignUp} />
    </SafeAreaView>
  );
};

export default Signup;
