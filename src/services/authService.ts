import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {supabase} from '../supabaseClient';

const API_URL = `${process.env.BACKEND_URL}/api/auth`;

export const signUp = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/signup`, {email, password});
};

export const signIn = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/signin`, {email, password});
};

export const signOut = async () => {
  return await axios.post(`${API_URL}/signout`);
};

export const signInWithGoogle = async (idToken: string) => {
  return await axios.post(`${API_URL}/google`, {idToken});
};

export const storeSession = async session => {
  try {
    await AsyncStorage.setItem('access_token', session.access_token);
    await AsyncStorage.setItem('refresh_token', session.refresh_token);
    await AsyncStorage.setItem('user', JSON.stringify(session.user));
  } catch (error) {
    console.error('Error storing session', error);
  }
};

export const getSession = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const user = await AsyncStorage.getItem('user');
    return {
      accessToken,
      refreshToken,
      user: user ? JSON.parse(user) : null,
    };
  } catch (error) {
    console.error('Error retrieving session', error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing session', error);
  }
};

export const checkUserSession = async () => {
  const {data, error} = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session?.user || null;
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  const {data: authListener} = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user || null);
    },
  );
  return authListener;
};
