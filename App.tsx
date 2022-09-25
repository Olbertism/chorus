import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/HomeScreen';
import NewEntry from './components/screens/NewEntryScreen';
import Setup from './components/screens/SetupScreen';
import Statistics from './components/screens/StatsScreen';
import EntryDefaults from './components/screens/EditDefaultsScreen';

const Stack = createNativeStackNavigator();

function RootStack<RootStackParamList>() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewEntry" component={NewEntry} />
      <Stack.Screen name="EntryDefaults" component={EntryDefaults} />
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Statistics" component={Statistics} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
