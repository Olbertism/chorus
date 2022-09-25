import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Statistics() {
  return (
    <>
      <View style={styles.container}>
        <Text>Stats and team overview</Text>
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
    backgroundColor: '#8ee1ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
