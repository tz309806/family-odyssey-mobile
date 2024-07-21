import 'react-native-gesture-handler'; // Ensure this is at the top
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hello world from the file</Text>
        </View>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
