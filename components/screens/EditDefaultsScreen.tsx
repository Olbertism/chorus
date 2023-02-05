import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { chores } from '../../util/database/chores';
import { RootStackParamList } from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDefaults'>;

export default function EntryDefaults({ navigation, route }: Props) {
  const { choreId } = route.params;
  const selectedChore = chores.find((chore) => {
    return chore.choreId === choreId;
  });

  return (
    <>
      <StatusBar translucent={true} />
      <Header label={selectedChore?.choreName} />
      <View style={styles.mainWrapper}>
        <View>
          <Text style={styles.copyText}>TODO: Here you can change the default log values.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Abort</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
