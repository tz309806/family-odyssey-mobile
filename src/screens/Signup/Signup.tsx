import React, {useState} from 'react';
import {SafeAreaView, TextInput, Button, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/route-types.ts';
import style from './style';

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

  const handleSignup = () => {
    console.log('Sign Up button tapped');
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPassword}`);
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
