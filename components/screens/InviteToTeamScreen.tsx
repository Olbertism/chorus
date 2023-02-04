import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { onValue, push, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { colors, styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { RootStackParamList, TeamMemberDataSnapshot } from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'InviteToTeam'>;

async function inviteToTeam(teamId: string, inviteArray: string[]) {
  const members = [...inviteArray];

  const reference = ref(database, `/teams/${teamId}/members`);

  for (const member of members) {
    const newMemberKey = push(reference);
    await update(newMemberKey, { mailAddress: member });
  }
}

export default function InviteToTeam({ route }: Props) {
  const [invitationList, setInvitationList] = useState<string[]>([]);
  const [currentInvite, setCurrentInvite] = useState('');
  const [teamId, setTeamId] = useState<string | null>('');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const userMail = route.params.userMail;

  useEffect(() => {
    return onValue(ref(database, '/teams'), (snapshot) => {
      snapshot.forEach((team) => {
        const currentTeamMembers = team.val().members as TeamMemberDataSnapshot | undefined;
        const currentTeamId = team.key;
        const membersMailAddresses = [];
        if (currentTeamMembers === undefined) {
          return;
        }
        for (const value of Object.values(currentTeamMembers)) {
          membersMailAddresses.push(value.mailAddress);

          if (value.mailAddress === userMail) {
            setTeamId(currentTeamId);
            setTeamName(team.val().teamName);
          }
        }
        setTeamMembers(membersMailAddresses);
      });
    });
  }, [userMail]);

  const handleInviteChange = (text: string) => {
    setCurrentInvite(text);
  };

  const handleAddToInvitation = (mailAddress: string) => {
    if (mailAddress !== '') {
      const updatedInvitationList = [...invitationList, mailAddress];
      setInvitationList(updatedInvitationList);
    }
  };

  if (!teamId) {
    return (
      <View style={styles.mainWrapper}>
        <Text style={styles.copyText}>You need to be in a Team first!</Text>
      </View>
    );
  }

  if (!userMail) {
    return (
      <View style={styles.mainWrapper}>
        <Text style={styles.copyText}>An error occured</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Invite new people to your team" />
      <View style={styles.mainWrapper}>
        <Text style={styles.headline}>Invite to team "{teamName}"</Text>
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
        <Text style={styles.headline}>Current team members:</Text>
        <View>
          {teamMembers.map((entry) => {
            return (
              <View key={entry}>
                <Text style={styles.copyText}>{entry}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.headline}>Currently invited:</Text>
        <View style={{ marginBottom: 15 }}>
          {invitationList.map((entry) => {
            return (
              <View key={entry}>
                <Text style={styles.copyText}>{entry}</Text>
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
              inviteToTeam(teamId, invitationList).catch((error) => {
                console.log(error);
              });
            }}
          >
            <Text style={styles.text}>Submit invitation</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
