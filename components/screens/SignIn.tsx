import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import { Ionicons } from '@expo/vector-icons';
import { handleSignIn } from '../../util/firebase/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState({ name: 'eye-off' });

  function toggleVisibility() {
    if (visibility.name === 'eye') {
      setVisibility({ name: 'eye-off' });
    } else {
      setVisibility({ name: 'eye' });
    }
  }

  function secureTextEntry() {
    if (visibility.name === 'eye') {
      return false;
    } else if (visibility.name === 'eye-off') {
      return true;
    }
  }

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      console.error('Invalid Credentials');
    } else {
      try {
        await handleSignIn(email, password);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="Sign In" />
      <View style={styles.mainWrapper}>
        <View>
          <TextInput
            defaultValue={email}
            onChangeText={handleEmailChange}
            placeholder="Email Address"
          />
        </View>
        <View>
          <TextInput
            defaultValue={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter Password"
            secureTextEntry={secureTextEntry()}
          />
          <Ionicons name={visibility.name} onPress={toggleVisibility} />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}