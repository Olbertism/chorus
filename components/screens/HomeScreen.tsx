import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { Pressable, Text, View } from 'react-native';
import { colors, styles } from '../../styles/constants';
import { TabParamList } from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<TabParamList, 'Dashboard'>;

export default function Dashboard({ navigation, route }: Props) {
  const uid = route.params.uid;
  const userMail = route.params.userMail;
  const userName = route.params.userName;

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
      <View style={{ height: '15%', backgroundColor: colors.secondary }} />
      <Header label="You're at home, baby." />
      <View style={styles.mainWrapper}>
        <Text style={{ ...styles.copyText, paddingBottom: 90 }}>
          Hello, {userName ? userName : 'TODO: refetch after signup'}
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('NewEntry', {
                uid: uid,
                userMail: userMail,
                userName: userName,
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
                userName: userName,
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
