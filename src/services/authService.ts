// src/services/authService.ts
import axios from 'axios';
import {supabase} from '../supabaseClient';

// const backendUrl = process.env.BACKEND_URL;

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

export const getSession = async () => {
  return await axios.get(`${API_URL}/session`);
};
// Supabase specific session management
export const checkUserSession = async () => {
  const {data, error} = await supabase.auth.getSession();
  console.log('DATA IS: ', data);
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session?.user || null;
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  console.log('ran onAuthStateChange');
  const {data: authListener} = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user || null);
    },
  );
  return authListener;
};
