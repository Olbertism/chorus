import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Dashboard from './components/screens/HomeScreen';
import NewEntry from './components/screens/NewEntryScreen';
import Setup from './components/screens/SetupScreen';
import Statistics from './components/screens/StatsScreen';
import EntryDefaults from './components/screens/EditDefaultsScreen';
import Settings from './components/screens/SettingsScreen';
import { RootStackParamList } from './util/types';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './util/firebase/firebase';
import { useCallback, useEffect, useState } from 'react';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Start from './components/screens/StartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateNewTeam from './components/screens/CreateNewTeamScreen';
import InviteToTeam from './components/screens/InviteToTeamScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Caveat_500Medium } from '@expo-google-fonts/caveat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

let myApp = initializeApp(firebaseConfig);

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ route }: HomeProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{
          uid: route.params.uid,
          userMail: route.params.userMail,
          userName: route.params.userName,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{
          uid: route.params.uid,
          userMail: route.params.userMail,
          userName: route.params.userName,
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack({ user }: { user: User | null }) {
  const uid = user?.uid;
  const userMail = user?.email;
  const userName = user?.displayName;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
            initialParams={{
              uid: uid,
              userMail: userMail,
              userName: userName,
            }}
          />
          <Stack.Screen name="NewEntry" component={NewEntry} />
          <Stack.Screen name="EntryDefaults" component={EntryDefaults} />
          <Stack.Screen name="Setup" component={Setup} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="CreateNewTeam" component={CreateNewTeam} />
          <Stack.Screen name="InviteToTeam" component={InviteToTeam} />
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

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Caveat_500Medium,
  });

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack user={currentUser} />
    </NavigationContainer>
  );
}
