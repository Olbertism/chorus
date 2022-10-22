import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, styles } from '../../styles/constants';
import Header from '../Header';
import { AntDesign } from '@expo/vector-icons';
import { child, push, ref, update } from 'firebase/database';
import { database } from '../../util/firebase/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateNewTeam'>;

function createNewTeam(
  name: string,
  inviteArray: string[],
  currentUserMail: string,
) {
  const members = [...inviteArray, currentUserMail];
  const newTeamKey = push(child(ref(database), 'teams')).key;

  if (!newTeamKey) {
    return;
  }

  const newTeamWrapper = {};
  newTeamWrapper['/teams/' + newTeamKey] = { teamName: name };
  update(ref(database), newTeamWrapper);
  const teamRef = ref(database, '/teams/' + newTeamKey);
  update(teamRef, { members: {} });

  for (const member of members) {
    const newMemberKey = push(
      ref(database, '/teams/' + newTeamKey + '/members'),
    );
    update(newMemberKey, { mailAddress: member });
  }
}

export default function CreateNewTeam({ route }: Props) {
  const [invitationList, setInvitationList] = useState<string[]>([]);
  const [currentInvite, setCurrentInvite] = useState('');
  const [teamName, setTeamName] = useState('');

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

  if (!currentUserMail) {
    return <Text>An error occured</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Create a new team" />
      <View style={styles.mainWrapper}>
        <View style={styles.form}>
          <TextInput
            placeholder="Enter Team Name"
            style={styles.formTextInput}
            onChangeText={handleTeamNameChange}
          />
        </View>
        <Text style={styles.headline}>Invite members</Text>
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
            color={colors.primary}
            onPress={() => {
              handleAddToInvitation(currentInvite);
            }}
          />
        </View>

        <Text style={styles.headline}>Currently invited:</Text>
        <View>
          <Text>You :-&#41;</Text>
          {invitationList.map((entry) => {
            return (
              <View key={entry}>
                <Text>{entry}</Text>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color={colors.primary}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              createNewTeam(teamName, invitationList, currentUserMail);
            }}
          >
            <Text style={styles.text}>Create Team</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
