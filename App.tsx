import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {checkUserSession, onAuthStateChange} from './src/services/authService';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return <RootNavigator user={user} setUser={setUser} />; // Pass setUser to RootNavigator
};

export default App;
