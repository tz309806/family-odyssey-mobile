import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {checkUserSession, onAuthStateChange} from './src/services/authService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppProvider, useAppContext} from './src/AppContext';
import MapboxGL from '@rnmapbox/maps';

const AppContent: React.FC = () => {
  const {setUser} = useAppContext();
  const [loading, setLoading] = useState(true);
  const [coordinates] = useState([8.674252499999994, 9.0845755]);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your configuration
    });

    // Set Mapbox Access Token
    MapboxGL.setAccessToken(process.env.MAPBOX_TOKEN); // Ensure the token is loaded correctly

    const fetchUser = async () => {
      const currentUser = await checkUserSession();
      setUser(currentUser);
      console.log('USER: ', currentUser);
      setLoading(false);
    };

    fetchUser();

    const {subscription} = onAuthStateChange(newUser => {
      setUser(newUser);
    });

    return () => {
      subscription?.unsubscribe();
    };
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

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
