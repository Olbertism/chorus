import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { child, push, ref, update } from 'firebase/database';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { colors, styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { RootStackParamList, TeamCreatorWrapper } from '../../util/types';
import Header from '../Header';
import { resetDefaultEntries } from './SettingsScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateNewTeam'>;

async function createNewTeam(
  teamName: string,
  inviteArray: string[],
  currentUserMail: string,
  setWasSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const members = [...inviteArray, currentUserMail];
  const newTeamKey = push(child(ref(database), 'teams')).key;

  if (!newTeamKey) {
    return;
  }

  const newTeamWrapper = {} as TeamCreatorWrapper;
  newTeamWrapper['/teams/' + newTeamKey] = { teamName: teamName };
  await update(ref(database), newTeamWrapper);
  const teamRef = ref(database, '/teams/' + newTeamKey);
  await update(teamRef, { members: {} });

  for (const member of members) {
    const newMemberKey = push(
      ref(database, '/teams/' + newTeamKey + '/members'),
    );
    await update(newMemberKey, { mailAddress: member, userName: 'Anonymus' });
  }
  // TODO also add usernames here based
  // challenge: fetch userData from different users on firebase???
  // idea: on user creation, add entry to lookup table userMail: userName
  // if team creation only needs registered users, get data from there
  // if includes unregistered keep Anonymus as long as user isn't there yet

  // big todo: proper invitation handling for invited people. right now they are just added, no questions asked...
  const defaultChores = resetDefaultEntries(newTeamKey);
  if (!defaultChores) {
    console.error('chore setup on team creation went wrong');
  }
  setWasSuccess(true);
}

// TODO return different content when already in team

export default function CreateNewTeam({ route, navigation }: Props) {
  const [invitationList, setInvitationList] = useState<string[]>([]);
  const [currentInvite, setCurrentInvite] = useState('');
  const [teamName, setTeamName] = useState('');
  const [wasSuccess, setWasSuccess] = useState(false);

  const currentUserMail = route.params.userMail;

  const handleInviteChange = (text: string) => {
    setCurrentInvite(text);
  };

  const handleTeamNameChange = (text: string) => {
    setTeamName(text);
  };

  const handleAddToInvitation = (mailAddress: string) => {
    if (mailAddress !== '') {
      const updatedInvitationList = [...invitationList, mailAddress];
      setInvitationList(updatedInvitationList);
    }
  };

  const handleRemoveFromInvitation = (entry: string) => {
    if (!entry || invitationList.length === 0) {
      return;
    }
    const updatedInvitationList = [...invitationList].filter(
      (listEntry) => listEntry !== entry,
    );
    setInvitationList(updatedInvitationList);
  };

  if (!currentUserMail) {
    return <Text>An error occured</Text>;
  }

  if (wasSuccess) {
    return (
      <>
        <StatusBar translucent={true} />
        <Header label="Create a new team" />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: colors.secondary,
          }}
        >
          <Text style={styles.copyText}>Successfully created Team!</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.text}>Back to Settings</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Create a new team" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.secondary,
        }}
      >
        <View style={{ ...styles.form, marginBottom: 50, width: '100%' }}>
          <TextInput
            placeholder="Enter Team Name"
            style={{ ...styles.formTextInput, width: '85%' }}
            onChangeText={handleTeamNameChange}
          />
        </View>
        <Text style={styles.headline}>Invite members:</Text>
        <View style={styles.inviteBox}>
          <TextInput
            placeholder="Enter Mail Address"
            style={styles.formTextInput}
            defaultValue={currentInvite}
            onChangeText={handleInviteChange}
          />
          <AntDesign
            name="pluscircle"
            size={24}
            color={currentInvite ? colors.primary : colors.text}
            onPress={() => {
              handleAddToInvitation(currentInvite);
            }}
          />
        </View>

        <Text style={styles.headline}>Currently invited:</Text>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.copyText}>You :-&#41;</Text>
          {invitationList.map((entry) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '50%',
                }}
                key={entry}
              >
                <Text style={styles.copyText}>{entry}</Text>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color={colors.primary}
                  onPress={() => handleRemoveFromInvitation(entry)}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              createNewTeam(
                teamName,
                invitationList,
                currentUserMail,
                setWasSuccess,
              ).catch((error) => {
                console.log(error);
              });
            }}
          >
            <Text style={styles.text}>Create Team</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
