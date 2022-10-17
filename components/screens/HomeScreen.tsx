import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Pressable,
  SliderBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



export default function Home({ navigation }: Props) {
  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="You're at home, baby." />

      <View style={styles.mainWrapper}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('NewEntry')}
          >
            <Text style={styles.text}>Log a new entry</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Statistics')}
          >
            <Text style={styles.text}>Go to statistics</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.text}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
