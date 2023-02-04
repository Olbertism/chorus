import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f0e5cf',
  cardBackground: '#f0d9ff',
  cardShadow: '#bfa2db',
  text: '#3f3e41',
  primary: '#ad2e2e',
  secondary: '#FBF4F4',
  accent: '#CD9E42',
};

// NEVER USE px IN A STRING FOR NUMERIC VALUES, E.G. padding: '10px' -> THIS WILL CRASH ON ANDROID

// DONT USE FONTWEIGHT FOR ANDROID

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    backgroundColor: colors.secondary,
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '80%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 10,
    fontSize: 15,
    color: colors.accent,
    fontFamily: 'Poppins_400Regular',
  },
  formWeightInput: {
    width: '25%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 10,
    fontSize: 15,
    color: colors.accent,
    fontFamily: 'Poppins_400Regular',
  },
  formTextInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inviteBox: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  header: {
    backgroundColor: colors.secondary,
    paddingTop: Constants.statusBarHeight / 2,
    paddingBottom: 20,
  },
  headerText: {
    color: colors.text,
    fontSize: 32,
    // fontWeight: 'bold', -> Don't do this, font will not be rendered on Android
    textAlign: 'center',
    fontFamily: 'Caveat_500Medium',
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  statsMainWrapper: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: colors.secondary,
  },
  headline: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '65%',
    margin: 10,
  },
  newEntryButtonBox: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: colors.secondary,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  copyText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  statsEntryTitle: {
    color: colors.secondary,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 3,
  },
  statsEntryText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  flatListWrapper: {
    width: '100%',
  },
  flatListItem: {
    padding: 15,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  flatListText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  flatListSeperator: {
    height: 8,
    width: '100%',
    backgroundColor: colors.secondary,
  },
  statEntryWrapper: {
    backgroundColor: colors.primary,
    padding: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  statsOverviewUsername: {
    color: colors.primary,
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 3,
  },
  statsOverviewBox: {
    flex: 1,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsOverviewText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  modalWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 8,
    display: 'flex',
    alignItems: 'center',
  },
  modalTextInput: {
    width: '80%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 10,
    fontSize: 15,
    color: colors.secondary,
    fontFamily: 'Poppins_400Regular',
  },
  modalWeightInput: {
    width: '20%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 10,
    fontSize: 15,
    color: colors.secondary,
    fontFamily: 'Poppins_400Regular',
  },
});

export const statsContentContainer = StyleSheet.create({
  contentContainer: { justifyContent: 'center' },
});
