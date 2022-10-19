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
import { AuthStackParamList, RootStackParamList } from '../../util/types';
import { getAuth } from 'firebase/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Start'>;

export default function Start({ navigation }: Props) {
  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="You're at home, baby." />
      <View style={styles.mainWrapper}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.text}>Sign up</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
