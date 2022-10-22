import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './components/screens/HomeScreen';
import NewEntry from './components/screens/NewEntryScreen';
import Setup from './components/screens/SetupScreen';
import Statistics from './components/screens/StatsScreen';
import EntryDefaults from './components/screens/EditDefaultsScreen';
import Settings from './components/screens/SettingsScreen';
import { RootStackParamList } from './util/types';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './util/firebase/firebase';
import { useEffect, useState } from 'react';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Start from './components/screens/StartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateNewTeam from './components/screens/CreateNewTeamScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

let myApp = initializeApp(firebaseConfig);

function Home({ route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{ uid: route.params.uid, userMail: route.params.userMail }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ uid: route.params.uid, userMail: route.params.userMail }}
      />
    </Tab.Navigator>
  );
}

function RootStack({ user }: { user: User | null }) {
  console.log('rootstack user', user);
  const uid = user?.uid;
  const userMail = user?.email;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
            initialParams={{ uid: uid, userMail: userMail }}
          />
          <Stack.Screen name="NewEntry" component={NewEntry} />
          <Stack.Screen name="EntryDefaults" component={EntryDefaults} />
          <Stack.Screen name="Setup" component={Setup} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="CreateNewTeam" component={CreateNewTeam} />
        </>
      ) : (
        <>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [uid, setUid] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <RootStack user={currentUser} />
    </NavigationContainer>
  );
}
