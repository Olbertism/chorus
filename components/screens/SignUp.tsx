import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, styles } from '../../styles/constants';
import { handleSignUp } from '../../util/firebase/firebase';
import Header from '../Header';

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
      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <View style={styles.formTextInputWrapper}>
            <TextInput
              defaultValue={name}
              onChangeText={handleNameChange}
              placeholder="Name"
              style={styles.formTextInput}
            />
          </View>
          <View style={styles.formTextInputWrapper}>
            <TextInput
              defaultValue={email}
              onChangeText={handleEmailChange}
              placeholder="Email Address"
              style={styles.formTextInput}
            />
          </View>
          <View style={{ ...styles.formTextInputWrapper, width: '80%' }}>
            <TextInput
              defaultValue={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter Password"
              secureTextEntry={secureTextEntry()}
              style={styles.formTextInput}
            />
            <Ionicons
              name={visibility.name}
              onPress={toggleVisibility}
              size={30}
              color={colors.primary}
            />
          </View>
          <View style={{...styles.formTextInputWrapper, width: '80%'}}>
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
      </KeyboardAwareScrollView>
    </>
  );
}
