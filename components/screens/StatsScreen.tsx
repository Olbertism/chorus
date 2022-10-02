import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';

export default function Statistics() {
  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="Team overview" />
      <View style={styles.mainWrapper}>
        <View>
          <Text>Stats and team overview</Text>
        </View>
      </View>
    </>
  );
}
