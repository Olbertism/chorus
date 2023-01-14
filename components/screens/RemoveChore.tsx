import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ref, remove } from 'firebase/database';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { Chore, chores } from '../../util/database/chores';
import { RootStackParamList } from '../../util/types';
import Header from '../Header';
import { database } from '../../util/firebase/firebase';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'RemoveChore'>;

function deleteSelectedChore(choreId: string) {
  const choreRef = ref(database, `chores/${choreId}`);
  return remove(choreRef)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export default function RemoveChore({ navigation, route }: Props) {
  const [deletionError, setDeletionError] = useState(false);
  const { choreId } = route.params;
  const selectedChore = chores.find((chore) => {
    return chore.choreId === choreId;
  });

  if (!selectedChore || !choreId) {
    return <Text>An error occured.</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label={selectedChore.choreName} />
      <View style={styles.mainWrapper}>
        <View>
          {deletionError ? (
            <Text>An error occurred when trying to delete the chore</Text>
          ) : (
            <Text>
              Do you really want to delete {selectedChore.choreName}? Tracked entries for this chore will still show up in the statistics.
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text
              style={styles.text}
              onPress={() => {
                const result = deleteSelectedChore(choreId);
                result
                  .then((isSuccess) =>
                    isSuccess ? navigation.goBack() : setDeletionError(true),
                  )
                  .catch((error) => console.log(error));
              }}
            >
              Delete
            </Text>
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
