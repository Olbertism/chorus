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
import { useEffect, useState } from 'react';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Start from './components/screens/StartScreen';

const Root = createNativeStackNavigator<RootStackParamList>();

let myApp = initializeApp(firebaseConfig);

function RootStack({ uid }: { uid: string }) {
  console.log('rootstack uid', uid);
  return (
    <Root.Navigator>
      {uid ? (
        <>
          <Root.Screen name="Home" component={Home} />
          <Root.Screen name="NewEntry" component={NewEntry} />
          <Root.Screen name="EntryDefaults" component={EntryDefaults} />
          <Root.Screen name="Setup" component={Setup} />
          <Root.Screen name="Statistics" component={Statistics} />
          <Root.Screen name="Settings" component={Settings} />
        </>
      ) : (
        <>
          <Root.Screen name="Start" component={Start} />
          <Root.Screen name="SignUp" component={SignUp} />
          <Root.Screen name="SignIn" component={SignIn} />
        </>
      )}
    </Root.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState('');

  console.log('app uid', uid);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
      } else {
        setUser(null);
        setUid('');
      }
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <RootStack uid={uid} />
      </NavigationContainer>
    </>
  );
}
