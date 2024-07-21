// import React, { useEffect } from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import { Linking, Alert } from 'react-native';
// import StackNavigation from "./StackNavigation";
//
// const RootNavigator = () => {
//     const ref = React.useRef();
//
//     useEffect(() => {
//         const handleDeepLink = (event) => {
//
//             const decodedUrl = decodeURIComponent(event.url);
//             const route = decodedUrl.replace(/.*?:\/\//g, ""); // removes the scheme
//             // Assuming your URL is something like "myapp://details/42"
//             const path = route.split('/'); // ['details', '42']
//             const screen = path[0]; // 'details'
//             const id = path[1]; // '42'
//             if (ref.current) {
//                 // Navigate using the ref to your navigation container
//                 ref.current.navigate(screen, { id });
//             }
//         };
//
//         Linking.getInitialURL().then(url => {
//             if (url) handleDeepLink({ url });
//             //Alert.alert(url);
//         });
//         Linking.addEventListener('url', handleDeepLink);
//
//         // return () => {
//         //     Linking.removeAllListeners('url', handleDeepLink);
//         // };
//     }, []);
//
//     return (
//         <NavigationContainer ref={ref}>
//             <StackNavigation />
//         </NavigationContainer>
//     );
// }
//
// export default RootNavigator;
