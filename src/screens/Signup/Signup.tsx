import React, {useState} from 'react';
import {SafeAreaView, TextInput, Button, Text, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types.ts';
import style from './style';
import {signUp} from '../../services/authService';

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

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Home'); // Redirect to home or login screen
    } catch (error) {
      console.log('ERROR: ', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Something went wrong',
      );
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
      <Text style={style.text}>
        By signing up you agree to the terms of use and privacy policy
      </Text>
      <Button title="Sign Up" onPress={handleSignup} />
    </SafeAreaView>
  );
};

export default Signup;
