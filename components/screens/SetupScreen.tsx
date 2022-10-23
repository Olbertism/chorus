import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Setup() {
  return (
    <>
      <View style={styles.container}>
        <Text>First time set up</Text>
        <StatusBar />
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
    backgroundColor: '#b1eced',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
