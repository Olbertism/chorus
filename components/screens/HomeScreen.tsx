import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from '../Header';

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar
        // backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <Header label="You're at home, baby." />
      <View style={styles.container}>
        <Text>You're at home, baby.</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Button
          title="Log a new entry"
          onPress={() => navigation.navigate('NewEntry')}
        />
      </View>
      <View>
        <Button
          title="Go to statistics"
          onPress={() => navigation.navigate('Statistics')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
