import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/HomeScreen';
import NewEntry from './components/screens/NewEntryScreen';
import Setup from './components/screens/SetupScreen';
import Statistics from './components/screens/StatsScreen';
import EntryDefaults from './components/screens/EditDefaultsScreen';
import Settings from './components/screens/SettingsScreen';
import { RootStackParamList } from './util/types';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './util/firebase/firebase';

const Stack = createNativeStackNavigator<RootStackParamList>();
let myApp = initializeApp(firebaseConfig);

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewEntry" component={NewEntry} />
      <Stack.Screen name="EntryDefaults" component={EntryDefaults} />
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
