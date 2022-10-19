import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import { initFirebaseChores } from '../../util/database/chores';
import Header from '../Header';

function resetDefaultEntries() {
  initFirebaseChores()
}

export default function Settings() {
  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="Settings" />
      <View style={styles.mainWrapper}>
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
