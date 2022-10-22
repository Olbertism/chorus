import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Pressable,
  SliderBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';
import { getAuth, User } from 'firebase/auth';
import { useEffect, useId, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Dashboard({ navigation, route }: Props) {
  // const [user, setUser] = useState<User | null>(null);

  console.log(route.params)
  const uid = route.params.uid
  const userMail = route.params.userMail

  /* useEffect(() => {
    setUser(getAuth().currentUser);
  }, []); */

  const handleSignOut = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log('sign out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!uid) {
    return <Text>Unable to fetch user</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="You're at home, baby." />
      <Text>{userMail}</Text>
      <View style={styles.mainWrapper}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('NewEntry', {
                uid: uid,
                userMail: userMail,
              })
            }
          >
            <Text style={styles.text}>Log a new entry</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('Statistics', {
                uid: uid,
                userMail: userMail,
              })
            }
          >
            <Text style={styles.text}>Go to statistics</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
