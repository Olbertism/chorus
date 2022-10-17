import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  child,
  Database,
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  set,
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

/* function testDBGetter() {
  const db = getDatabase();
  const reference = ref(db, 'users/' + 'choreId');
  onValue(reference, (snapshot) => {
    const highscore = snapshot.val().dummy;
    console.log('New high score: ' + highscore);
  });
} */

function getChoreWeight(database: Database, choreId: string) {
  const reference = ref(database, 'chores/' + choreId);
  get(child(reference, 'chores/' + choreId))
    .then((snapshot) => {
      if (snapshot.exists() && snapshot.val().choreWeight) {
        return snapshot.val().choreWeight as string;
      } else {
        console.log('No data available');
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// onValue return is always an Unsubscribe function...
/* function getChoreWeight(database: Database, choreId: string) {
  const reference = ref(database, 'chores/' + choreId);
  return onValue(ref(database, 'chores/' + choreId), (snapshot) => {
    const choreWeight = (snapshot.val() && snapshot.val().choreWeight) || null;
    return choreWeight
  }, {
    onlyOnce: true
  });
} */

function submitEntry(choreId: string) {
  const db = getDatabase();
  const choreWeight = getChoreWeight(db, choreId);
  set(ref(db, 'choreLogs/' + crypto.randomUUID()), {
    choreId: choreId,
    userId: 'dummy',
    timestamp: Date.now(),
    choreDate: 'dummy',
    choreWeight: choreWeight,
  });
}

export default function NewEntry({ navigation }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chores, setChores] = useState<Chore>([]);

  // console.log(chores);
  // console.log(Object.keys(chores));

  useEffect(() => {
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, '/chores'), (snapshot) => {
      let response = snapshot.val() || {};
      let rawData = { ...response };

      console.log(rawData);

      // reshaping data into an array...
      const chores = [];
      snapshot.forEach((child) => {
        chores.push({ choreId: child.key, ...child.val() });
      });

      console.log(chores);

      setChores(chores);
    });
  }, []);

  const renderItem = ({ item }: { item: Chore }) => {
    const backgroundColor =
      item.choreId === selectedId ? colors.primary : colors.secondary;
    const color =
      item.choreId === selectedId ? colors.secondary : colors.primary;

    return (
      <ChoreItem
        item={item}
        onPress={() => setSelectedId(item)}
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
                onPress={() => submitEntry(selectedId)}
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
