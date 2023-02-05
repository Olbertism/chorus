import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { statsContentContainer, styles } from '../../styles/constants';
import { database } from '../../util/firebase/firebase';
import { convertDate, isCurrentMonth } from '../../util/helpers';
import {
  ChoreLogParams,
  MemberLog,
  RootStackParamList,
  TeamMemberDataSnapshot,
  TeamMembersArray,
} from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

function createMonthOverview(members: TeamMembersArray, entries: ChoreLogParams[]) {
  const memberLogs = [];
  for (const member of members) {
    const memberLog = {} as MemberLog;
    memberLog.userName = member.userName;
    memberLog.totalChoreCounts = 0;
    memberLog.totalChoreWeights = 0;

    for (const choreEntry of entries) {
      if (choreEntry.userName === member.userName && isCurrentMonth(choreEntry.choreDate)) {
        memberLog.totalChoreCounts += 1;
        memberLog.totalChoreWeights += choreEntry.choreWeight;
      }
    }
    memberLogs.push(memberLog);
  }
  return memberLogs;
}

export default function Statistics({ route }: Props) {
  const [userChoreEntries, setUserChoreEntries] = useState<ChoreLogParams[]>(
    [],
  );
  const [teamChoreEntries, setTeamChoreEntries] = useState<ChoreLogParams[]>(
    [],
  );
/*   const [teamId, setTeamId] = useState<string | null>(route.params.teamId);
  const [teamName, setTeamName] = useState(route.params.teamName); */
  // const [teamMembers, setTeamMembers] = useState<Set<unknown>>(new Set());
  const [loading, setLoading] = useState(true);

  const uid = route.params.uid;
  const userMail = route.params.userMail;
  const teamId = route.params.teamId;
  const teamName = route.params.teamName
  const teamMembers = route.params.teamMembers
  const teamMemberRefs = route.params.teamMemberRefs

 /*  useEffect(() => {
    return onValue(ref(database, '/teams'), (snapshot) => {
      snapshot.forEach((team) => {
        const currentTeamMembers = team.val().members as TeamMemberDataSnapshot;
        const currentTeamId = team.key;
        for (const value of Object.values(currentTeamMembers)) {
          if (value.mailAddress === userMail) {
            setTeamId(currentTeamId);
            setTeamName(team.val().teamName);
          }
        }
      });
    });
  }, [userMail]); */

  // TODO: Don't derive team members from chore logs. If someone never logged anything
  // he will not show up at all. Also it is simply not smart to get it from here
  // Idea: get teammembers earlier and pass them via props
  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/choreLogs/' + teamId), (snapshot) => {
      const teamEntries = [] as ChoreLogParams[];
      const userEntries = [] as ChoreLogParams[];
      snapshot.forEach((child) => {
        teamEntries.push({ ...child.val() });
        if (child.val().userId && child.val().userId === uid) {
          userEntries.push({ ...child.val() });
        }
      });
      setTeamChoreEntries(teamEntries);
      setUserChoreEntries(userEntries);
      const members = new Set();
      console.log(teamEntries);
      for (const teamEntry of teamEntries) {
        if (!members.has(teamEntry.userName)) {
          members.add(teamEntry.userName);
        }
      }
      console.log('members', members);
      // setTeamMembers(members);
      setLoading(false);
    });
  }, [uid, teamId]);

  if (loading) {
    return (
      <>
        <StatusBar translucent={true} />
        <Header label="Team overview" />
        <View style={styles.mainWrapper}>
          <Text>Loading data...</Text>
        </View>
      </>
    );
  }

  if (!teamId || !teamMembers) {
    return (
      <View style={styles.mainWrapper}>
        <Text style={styles.copyText}>You need to create a Team first!</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Team overview" />
      <ScrollView
        style={styles.statsMainWrapper}
        contentContainerStyle={statsContentContainer.contentContainer}
      >
        <View>
          <Text style={styles.headline}>Your latest entries</Text>
        </View>
        <View>
          {userChoreEntries.map((entry) => {
            return (
              <View
                key={`${entry.choreId}-${entry.choreDate}-${entry.userId}`}
                style={styles.statEntryWrapper}
              >
                <Text style={styles.statsEntryTitle}>{entry.choreName}</Text>
                <Text style={styles.statsEntryText}>
                  {convertDate(entry.choreDate)}
                </Text>
                <Text style={styles.statsEntryText}>
                  Weight: {entry.choreWeight}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => console.log('todo')}
            >
              <Text style={styles.text}>See all your entries</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.headline}>Overview for current month</Text>
        </View>
        <View>
          {createMonthOverview(teamMembers, teamChoreEntries).map((entry) => {
            return (
              <View key={`${entry.userName}-${entry.totalChoreCounts}`}>
                <Text style={styles.statsOverviewUsername}>
                  {entry.userName}
                </Text>
                <View style={styles.statsOverviewBox}>
                  <Text style={styles.statsOverviewText}>
                    Tracked chores: {entry.totalChoreCounts}
                  </Text>
                  <Text style={styles.statsOverviewText}>
                    Total weight: {entry.totalChoreWeights}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => console.log('todo')}
            >
              <Text style={styles.text}>See entries for this month</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.headline}>
            Latest team entries for {teamName}
          </Text>
        </View>
        <View>
          {teamChoreEntries.map((entry) => {
            return (
              <View
                key={`${entry.choreId}-${entry.choreDate}-${entry.userId}`}
                style={styles.statEntryWrapper}
              >
                <Text style={styles.statsEntryTitle}>{entry.choreName}</Text>
                <Text style={styles.statsEntryTitle}>{entry.userName}</Text>
                <Text style={styles.statsEntryText}>
                  {convertDate(entry.choreDate)}
                </Text>
                <Text style={styles.statsEntryText}>
                  Weight: {entry.choreWeight}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => console.log('todo')}>
            <Text style={styles.text}>See all team entries</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
