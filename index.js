import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import App from './App';  // Adjusted to use App.tsx from the root directory
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
