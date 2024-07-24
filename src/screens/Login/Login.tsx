import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import style from './style';
import {RootStackParamList} from '../../navigation/route-types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registration'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
const Login = ({navigation}: Props) => {
  return (
    <SafeAreaView style={style.container}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
