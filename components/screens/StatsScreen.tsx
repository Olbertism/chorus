import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { getAuth, User } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { convertDate } from '../../util/helpers';
import { RootStackParamList, UserEntries } from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

export default function Statistics({ route }: Props) {
  const [choreEntries, setChoreEntries] = useState<UserEntries>([]);
  const [teamName, setTeamName] = useState('');

  const uid = route.params.uid;
  const userMail = route.params.userMail;

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/teams'), (snapshot) => {
      snapshot.forEach((team) => {
        const currentTeamMembers = team.val().members;
        for (const value of Object.values(currentTeamMembers)) {
          if (value.mailAddress === userMail) {
            setTeamName(team.val().teamName);
          }
        }
      });
    });
  }, [userMail]);

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/choreLogs'), (snapshot) => {
      const entries = [] as UserEntries;
      snapshot.forEach((child) => {
        console.log(child.val());
        if (child.val().userId && child.val().userId === uid) {
          entries.push({ ...child.val() });
        }
      });
      setChoreEntries(entries);
    });
  }, [uid]);

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Team overview" />
      <View style={styles.mainWrapper}>
        <View>
          <Text>Stats and team overview</Text>
        </View>
        <ScrollView>
          {choreEntries.map((entry) => {
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
          <Text style={styles.headline}>Latest team entries for {teamName}</Text>
        </View>
      </View>
    </>
  );
}
