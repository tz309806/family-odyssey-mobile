import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {supabase} from './src/supabaseClient.ts';
import {checkUserSession, onAuthStateChange} from './src/services/authService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppProvider, useAppContext} from './src/AppContext';

const AppContent = () => {
  const {setUser} = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <RootNavigator />;
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
