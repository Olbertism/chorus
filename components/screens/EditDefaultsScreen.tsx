import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { chores } from '../../util/database/chores';
import Header from '../Header';


export default function EntryDefaults({ navigation, route }) {
  const { choreId } = route.params;
  const selectedChore = chores.find((chore) => {
    return chore.choreId === choreId;
  });

  return (
    <>
      <View>
        <Text>{selectedChore?.choreName}</Text>
      </View>
      <View style={styles.container}>
        <Text>Change the default entry values</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Button title="Submit" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e18ed9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
