import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  onValue,
  ref,
  set,
  push,
  getDatabase,
  child,
  update,
} from 'firebase/database';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { colors, styles } from '../../styles/constants';
import { Chore } from '../../util/database/chores';
import { RootStackParamList } from '../../util/types';
import Header from '../Header';
import { database } from '../../util/firebase/firebase';
import { getAuth, User } from 'firebase/auth';

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

function submitEntry(choreId: string, chores: Chore[], uid: string) {
  const selectedChore = chores.find((chore) => {
    if (chore.choreId === choreId) {
      return true;
    }
    return false;
  });

  if (!selectedChore) {
    console.log('An error occured when selecting a chore');
    return;
  }

  const newLogData = {
    choreId: choreId,
    userId: uid,
    timestamp: Date.now(),
    choreDate: Date.now(), // default date is now
    choreName: selectedChore.choreName,
    choreWeight: selectedChore.choreWeight,
  };

  const newLogKey = push(child(ref(database), 'choreLogs')).key;

  if (!newLogKey) {
    return;
  }

  const newLogEntryWrapper = {};
  newLogEntryWrapper['/choreLogs/' + newLogKey] = newLogData;

  return update(ref(database), newLogEntryWrapper);
}

export default function NewEntry({ navigation }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chores, setChores] = useState<Chore[]>([]);
  const [uid, setUid] = useState<string>('');

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/chores'), (snapshot) => {
      // let response = snapshot.val() || {};
      // reshaping data into an array...
      const chores = [] as Chore[];
      snapshot.forEach((child) => {
        chores.push({ choreId: child.key, ...child.val() });
      });
      setChores(chores);
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (uid) {
      setUid(uid);
    }
  }, []);

  const renderItem = ({ item }: { item: Chore }) => {
    const backgroundColor =
      item.choreId === selectedId ? colors.primary : colors.secondary;
    const color =
      item.choreId === selectedId ? colors.secondary : colors.primary;

    return (
      <ChoreItem
        item={item}
        onPress={() => setSelectedId(item.choreId)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <StatusBar translucent={true} style="dark" />
      <Header label="Log a new chore" />
      <View style={styles.mainWrapper}>
        <SafeAreaView style={styles.flatListWrapper}>
          <FlatList
            data={chores}
            renderItem={renderItem}
            keyExtractor={(item) => item.choreId}
            extraData={selectedId}
            ItemSeparatorComponent={() => (
              <View style={styles.flatListSeperator} />
            )}
          />
        </SafeAreaView>
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
                onPress={() => submitEntry(selectedId, chores, uid)}
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
