import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { convertDate } from '../../util/helpers';
import {
  ChoreLogParams,
  RootStackParamList,
  TeamMemberDataSnapshot,
} from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

export default function Statistics({ route }: Props) {
  const [userChoreEntries, setUserChoreEntries] = useState<ChoreLogParams[]>(
    [],
  );
  const [teamChoreEntries, setTeamChoreEntries] = useState<ChoreLogParams[]>(
    [],
  );
  const [teamId, setTeamId] = useState<string | null>('');
  const [teamName, setTeamName] = useState('');

  const uid = route.params.uid;
  const userMail = route.params.userMail;

  useEffect(() => {
    return onValue(ref(database, '/teams'), (snapshot) => {
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

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/choreLogs/' + teamId), (snapshot) => {
      const teamEntries = [] as ChoreLogParams[];
      const userEntries = [] as ChoreLogParams[];
      snapshot.forEach((child) => {
        teamEntries.push({ ...child.val() });
        if (child.val().userId && child.val().userId === uid) {
          userEntries.push({ ...child.val() });
        }
      });
      setTeamChoreEntries(teamEntries);
      setUserChoreEntries(userEntries);
    });
  }, [uid, teamId]);

  if (!teamId) {
    return <Text>You need to create a team first!</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Team overview" />
      <View style={styles.mainWrapper}>
        <View>
          <Text>Stats and team overview</Text>
        </View>
        <ScrollView>
          {userChoreEntries.map((entry) => {
            return (
              <View key={crypto.randomUUID()}>
                <Text>{entry.choreName}</Text>
                <Text>{convertDate(entry.choreDate)}</Text>
                <Text>{entry.choreWeight}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View>
          <Text style={styles.headline}>
            Latest team entries for {teamName}
          </Text>
          {teamChoreEntries.map((entry) => {
            return (
              <View key={crypto.randomUUID()}>
                <Text>{entry.choreName}</Text>
                <Text>{convertDate(entry.choreDate)}</Text>
                <Text>{entry.choreWeight}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
}
