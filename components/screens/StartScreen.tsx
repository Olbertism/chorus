import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export default function Start({ navigation }: Props) {
  return (
    <>
      <StatusBar translucent={true} />
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
