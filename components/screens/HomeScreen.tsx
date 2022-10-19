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
import { getAuth } from 'firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const uid = getAuth().currentUser?.uid;
  if (!uid) {
    return <Text>An error occured</Text>;
  }

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

  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="You're at home, baby." />
      <Text>{getAuth().currentUser.email}</Text>
      <View style={styles.mainWrapper}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('NewEntry')}
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
              })
            }
          >
            <Text style={styles.text}>Go to statistics</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.text}>Settings</Text>
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
