import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/constants';
import Header from '../Header';
import { Ionicons } from '@expo/vector-icons';
import { handleSignUp } from '../../util/firebase/firebase';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibility, setVisibility] = useState<{ name: string }>({
    name: 'eye-off',
  });

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

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const handleSubmit = async () => {
    if (email === '' && password !== confirmPassword && password === '') {
      console.log('invalid credentials');
    } else {
      try {
        await handleSignUp(email, password, name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Sign Up" />
      <View style={styles.mainWrapper}>
        <View style={styles.form}>
          <View>
            <TextInput
              defaultValue={name}
              onChangeText={handleNameChange}
              placeholder="Name"
              style={styles.formTextInput}
            />
          </View>
          <View>
            <TextInput
              defaultValue={email}
              onChangeText={handleEmailChange}
              placeholder="Email Address"
              style={styles.formTextInput}
            />
          </View>
          <View>
            <TextInput
              defaultValue={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter Password"
              secureTextEntry={secureTextEntry()}
              style={styles.formTextInput}
            />
            <Ionicons name={visibility.name} onPress={toggleVisibility} />
          </View>
          <View>
            <TextInput
              defaultValue={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              secureTextEntry={secureTextEntry()}
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.text}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
