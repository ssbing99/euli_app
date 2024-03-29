import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import Main from './src/navigation';
import Entrypoint from './src/Entrypoint';
enableScreens();

AppRegistry.registerComponent(appName, () => Entrypoint);
