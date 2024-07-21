import 'react-native-gesture-handler'
import {AppRegistry, LogBox} from 'react-native';
import App from './App';  // Adjusted to use App.tsx from the root directory
import { name as appName } from './app.json';

LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => App);
