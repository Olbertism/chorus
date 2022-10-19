import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { getAuth, User } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { RootStackParamList } from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

export default function Statistics({ route }: Props) {
  // const [user, setUser] = useState<User | null>(null);
  const [userEntries, setUserEntries] = useState([]);

  const { uid } = route.params;

  console.log(uid);
  console.log(userEntries);

  /*   useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUser(user);
    }
  }, []); */

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/choreLogs'), (snapshot) => {
      const userEntries = [];
      snapshot.forEach((child) => {
        console.log(child.val());
        if (child.val().userId && child.val().userId === uid) {
          userEntries.push({ ...child.val() });
        }
      });
      console.log(userEntries);
      setUserEntries(userEntries);
    });
  }, []);

  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="Team overview" />
      <View style={styles.mainWrapper}>
        <View>
          <Text>Stats and team overview</Text>
        </View>
        <ScrollView>
          {userEntries.map((entry) => {
            return (
              <View>
                <Text>{entry.choreId}</Text>
                <Text>{entry.choreWeight}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
