import { Caveat_500Medium } from '@expo-google-fonts/caveat';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import CreateNewTeam from './components/screens/CreateNewTeamScreen';
import EditChoreList from './components/screens/EditChoreListScreen';
import EntryDefaults from './components/screens/EditDefaultsScreen';
import Dashboard from './components/screens/HomeScreen';
import InviteToTeam from './components/screens/InviteToTeamScreen';
import NewEntry from './components/screens/NewEntryScreen';
import Settings from './components/screens/SettingsScreen';
import Setup from './components/screens/SetupScreen';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Start from './components/screens/StartScreen';
import Statistics from './components/screens/StatsScreen';
import { database, firebaseConfig } from './util/firebase/firebase';
import { RootStackParamList, TeamMemberDataSnapshot } from './util/types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles/constants';
import { onValue, ref } from 'firebase/database';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

let myApp = initializeApp(firebaseConfig);

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ route }: HomeProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
        initialParams={{
          uid: route.params.uid,
          userMail: route.params.userMail,
          userName: route.params.userName,
          teamId: route.params.teamId,
          teamName: route.params.teamName,
          teamMembers: route.params.teamMembers,
          teamMemberRefs: route.params.teamMemberRefs,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
        initialParams={{
          uid: route.params.uid,
          userMail: route.params.userMail,
          userName: route.params.userName,
          teamId: route.params.teamId,
          teamName: route.params.teamName,
          teamMembers: route.params.teamMembers,
          teamMemberRefs: route.params.teamMemberRefs,
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack({
  user,
  teamId,
  teamName,
  teamMembers,
  teamMemberRefs,
}: {
  user: User | null;
  teamId: string | null;
  teamName: string | null;
  teamMembers:
    | {
        userName: string;
        mailAddress: string;
      }[]
    | null;
  teamMemberRefs: string[] | null;
}) {
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
              teamId: teamId,
              teamName: teamName,
              teamMembers: teamMembers,
              teamMemberRefs: teamMemberRefs,
            }}
          />
          <Stack.Screen name="NewEntry" component={NewEntry} />
          <Stack.Screen name="EntryDefaults" component={EntryDefaults} />
          <Stack.Screen name="Setup" component={Setup} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="CreateNewTeam" component={CreateNewTeam} />
          <Stack.Screen name="InviteToTeam" component={InviteToTeam} />
          <Stack.Screen name="EditChoreList" component={EditChoreList} />
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
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<
    { userName: string; mailAddress: string }[] | null
  >(null);
  const [teamMemberRefs, setTeamMemberRefs] = useState<string[] | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Caveat_500Medium,
  });

  // get User from db
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

  // get Team data from db if we have a user
  useEffect(() => {
    if (currentUser) {
      return onValue(ref(database, '/teams'), (snapshot) => {
        snapshot.forEach((team) => {
          const currentTeamMembers = team.val().members as
            | TeamMemberDataSnapshot
            | undefined;
          const currentTeamId = team.key;
          if (!currentTeamMembers) {
            return;
          }
          for (const value of Object.values(currentTeamMembers)) {
            if (value.mailAddress === currentUser.email) {
              setTeamId(currentTeamId);
              setTeamName(team.val().teamName);
            }
          }
          if (currentTeamId) {
            const memberRefs = Object.keys(team.val().members);
            setTeamMemberRefs(memberRefs);
            const members = Object.values(
              team.val().members as TeamMemberDataSnapshot,
            );
            setTeamMembers(members);
          }
        });
      });
    }
  }, [currentUser]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack
        user={currentUser}
        teamId={teamId}
        teamName={teamName}
        teamMembers={teamMembers}
        teamMemberRefs={teamMemberRefs}
      />
    </NavigationContainer>
  );
}
