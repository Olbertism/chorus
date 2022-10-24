import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { child, onValue, push, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, styles } from '../../styles/constants';
import { Chore } from '../../util/database/chores';
import { database } from '../../util/firebase/firebase';
import {
  LogEntryCreatorWrapper,
  RootStackParamList,
  TeamMemberDataSnapshot,
} from '../../util/types';
import Header from '../Header';

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>;

const ChoreItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: {
  item: Chore;
  onPress: any;
  backgroundColor: ViewStyle;
  textColor: TextStyle;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.flatListItem, backgroundColor]}
  >
    <Text style={[styles.flatListText, textColor]}>{item.choreName}</Text>
  </TouchableOpacity>
);

function submitEntry(
  choreId: string,
  chores: Chore[],
  uid: string,
  userName: string,
  teamId: string,
  teamName: string,
) {
  const selectedChore = chores.find((chore) => {
    return chore.choreId === choreId;
  });

  if (!selectedChore) {
    console.log('An error occured when selecting a chore');
    return;
  }

  const newLogData = {
    choreId: choreId,
    userId: uid,
    userName: userName,
    teamName: teamName,
    timestamp: Date.now(),
    choreDate: Date.now(), // default date is now
    choreName: selectedChore.choreName,
    choreWeight: selectedChore.choreWeight,
  };

  const newLogKey = push(child(ref(database), 'choreLogs')).key;

  if (!newLogKey) {
    return;
  }

  const newLogEntryWrapper = {} as LogEntryCreatorWrapper;
  newLogEntryWrapper[`/choreLogs/${teamId}/${newLogKey}`] = newLogData;

  return update(ref(database), newLogEntryWrapper);
}

export default function NewEntry({ navigation, route }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chores, setChores] = useState<Chore[]>([]);
  const [teamId, setTeamId] = useState<string | null>('');
  const [teamName, setTeamName] = useState('');

  const uid = route.params.uid;
  const userMail = route.params.userMail;
  const userName = route.params.userName;

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/chores'), (snapshot) => {
      // reshaping data into an array...
      const choreArray = [] as Chore[];
      snapshot.forEach((chore) => {
        choreArray.push({ choreId: chore.key, ...chore.val() });
      });
      setChores(choreArray);
    });
  }, []);

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
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
  }, [userMail]);

  const renderItem = ({ item }: { item: Chore }) => {
    const backgroundColor =
      item.choreId === selectedId ? colors.primary : colors.secondary;
    const color =
      item.choreId === selectedId ? colors.secondary : colors.primary;

    return (
      <ChoreItem
        item={item}
        onPress={() => {
          if (selectedId === item.choreId) {
            setSelectedId(null);
          } else {
            setSelectedId(item.choreId);
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  if (!userMail) {
    return <Text>An error occured</Text>;
  }

  if (!teamName || !teamId) {
    return <Text>You need to create a Team first!</Text>;
  }

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Log a new chore" />
      <View style={styles.mainWrapper}>
        <View style={{ height: selectedId ? '80%' : '95%' }}>
          <View style={styles.flatListWrapper}>
            <FlatList
              data={chores}
              renderItem={renderItem}
              keyExtractor={(item) => item.choreId}
              extraData={selectedId}
              persistentScrollbar
              showsVerticalScrollIndicator
              ItemSeparatorComponent={() => (
                <View style={styles.flatListSeperator} />
              )}
            />
          </View>
        </View>
        {selectedId ? (
          <>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate('EntryDefaults', {
                    choreId: selectedId,
                  })
                }
              >
                <Text style={styles.text}>Edit default values</Text>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  submitEntry(
                    selectedId,
                    chores,
                    uid,
                    userName,
                    teamId,
                    teamName,
                  )?.catch((error) => {
                    console.log(error);
                  });
                  setSelectedId(null);
                }}
              >
                <Text style={styles.text}>Submit</Text>
              </Pressable>
            </View>
          </>
        ) : null}
      </View>
    </>
  );
}
