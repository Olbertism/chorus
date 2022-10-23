import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { initFirebaseChores } from '../../util/database/chores';
import { RootStackParamList } from '../../util/types';
import Header from '../Header';

function resetDefaultEntries() {
  initFirebaseChores();
}

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function Settings({ navigation }: Props) {
  const user = getAuth().currentUser;
  if (!user) {
    return <Text>An error occured</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Settings" />
      <View style={styles.mainWrapper}>
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
            onPress={() => resetDefaultEntries()}
          >
            <Text style={styles.text}>Reset default chores</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
