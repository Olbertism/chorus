import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const colors = {
  background: '#f0e5cf',
  cardBackground: '#f0d9ff',
  cardShadow: '#bfa2db',
  text: '#3f3e41',
  primary: '#ad2e2e',
  secondary: '#FBF4F4',
  accent: '#CD9E42',
};

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
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
  },
  formTextInput: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 35,
    padding: 10,
    fontSize: 16,
    color: colors.accent,
  },
  inviteBox: {
    flexDirection: 'row',

  },
  header: {
    backgroundColor: colors.secondary,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  headerText: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Caveat_500Medium',
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  headline: {
    color: colors.primary,
    fontSize: 18,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    color: colors.secondary,
    padding: '10px',
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '65%',
    margin: '10px',
  },
  text: {
    color: colors.secondary,
    fontSize: 18,
  },
  flatListWrapper: {
    width: '80%',
  },
  flatListItem: {
    padding: '15px',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  flatListText: {
    fontSize: 18,
  },
  flatListSeperator: {
    height: 8,
    width: '100%',
    backgroundColor: colors.secondary,
  },
});
