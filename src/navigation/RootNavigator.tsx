import React from 'react';
import {NonAuthenticated} from './MainNavigation';

const RootNavigator = () => {
  return <NonAuthenticated />;
};

export default RootNavigator;



// // RootNavigator.tsx
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import NonAuthenticated from './NonAuthenticated';
// import MainNavigation from './MainNavigation';
//
// const Stack = createNativeStackNavigator();
//
// const RootNavigator = ({isAuthenticated}) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={isAuthenticated ? 'Authenticated' : 'NonAuthenticated'}
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="NonAuthenticated" component={NonAuthenticated} />
//         <Stack.Screen name="Authenticated" component={MainNavigation} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
//
// export default RootNavigator;
