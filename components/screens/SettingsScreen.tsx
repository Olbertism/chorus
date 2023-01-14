import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, styles } from '../../styles/constants';
import { initFirebaseChores } from '../../util/database/chores';
import { database } from '../../util/firebase/firebase';
import { RootStackParamList, TeamMemberDataSnapshot } from '../../util/types';
import Header from '../Header';

function resetDefaultEntries(teamId: string) {
  const result = initFirebaseChores(teamId);
  return result;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function Settings({ navigation, route }: Props) {
  const [teamId, setTeamId] = useState<string | null>('');
  const [teamName, setTeamName] = useState('');
  const [resetChoresResult, setResetChoresResult] = useState<null | boolean>(
    null,
  );
  const user = getAuth().currentUser;
  const userMail = route.params.userMail;
  const userName = route.params.userName;

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/teams'), (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach((team) => {
        const currentTeamMembers = team.val().members as TeamMemberDataSnapshot;
        const currentTeamId = team.key;
        for (const value of Object.values(currentTeamMembers)) {
          if (value.mailAddress === userMail) {
            setTeamId(currentTeamId);
            setTeamName(team.val().teamName);
          }
        }
      });
    });
  }, [userMail]);

  if (!user) {
    return <Text>An error occured</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <View style={{ height: '15%', backgroundColor: colors.secondary }} />
      <Header label="Settings" />
      <View style={styles.mainWrapper}>
        {resetChoresResult !== null ? (
          resetChoresResult ? (
            <Text>Successfully reset chores</Text>
          ) : (
            <Text>An error occurred when reseting chore list</Text>
          )
        ) : null}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('InviteToTeam', {
                userMail: user.email,
              })
            }
          >
            <Text style={styles.text}>Invite to your team</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('CreateNewTeam', {
                userMail: user.email,
              })
            }
          >
            <Text style={styles.text}>Create new team</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('EditChoreList', {
                userMail: user.email,
              })
            }
          >
            <Text style={styles.text}>Edit chore list</Text>
          </Pressable>
        </View>
        {teamId ? (
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                const result = resetDefaultEntries(teamId);
                setResetChoresResult(result);
              }}
            >
              <Text style={styles.text}>Reset default chores</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </>
  );
}
