import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../../util/types';
import { getAuth } from 'firebase/auth';

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
