import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { Caveat_500Medium } from '@expo-google-fonts/caveat';
import Constants from 'expo-constants';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/constants';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Caveat_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cardBackground,
  },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  label: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Caveat_500Medium',
  },
});