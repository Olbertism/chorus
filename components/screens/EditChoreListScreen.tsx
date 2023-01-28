import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { child, onValue, push, ref, remove, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, styles } from '../../styles/constants';
import { Chore } from '../../util/database/chores';
import { database } from '../../util/firebase/firebase';
import {
  ChoreCreatorWrapper,
  LogEntryCreatorWrapper,
  RootStackParamList,
  TeamMemberDataSnapshot,
} from '../../util/types';
import EditChoreModal from '../EditChoreModal';
import Header from '../Header';
import RemoveChoreModal from '../RemoveChoreModal';

type Props = NativeStackScreenProps<RootStackParamList, 'EditChoreList'>;

const ChoreItem = ({
  item,
  onPress,
  selectedId,
  backgroundColor,
  textColor,
  setShowEditModal,
  setActiveModal,
  setShowRemoveModal,
  navigation,
}: {
  item: Chore;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  selectedId: string | null;
  backgroundColor: ViewStyle;
  textColor: TextStyle;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: Props;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.flatListItem, backgroundColor]}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={[styles.flatListText, textColor]}>{item.choreName}</Text>
      {selectedId === item.choreId ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '25%',
            justifyContent: 'space-between',
          }}
        >
          <AntDesign
            name="edit"
            size={24}
            color={colors.secondary}
            onPress={() => {
              setActiveModal('editChore');
              setShowEditModal(true);
            }}
          />
          <AntDesign
            name="minuscircle"
            size={24}
            color={colors.secondary}
            onPress={() => {
              setActiveModal('removeChore');
              setShowRemoveModal(true);
            }}
          />
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

function goToRemoveChore({ navigation }: Props, selectedId: string) {
  navigation.navigate('RemoveChore', {
    choreId: selectedId,
  });
}

function submitNewChore(
  newChoreName: string,
  newChoreWeight: string,
  teamId: string,
) {
  const newChoreData = {
    choreName: newChoreName,
    choreWeight: Number(newChoreWeight),
  };
  const newChoreKey = push(child(ref(database), 'chores')).key;
  if (!newChoreKey) {
    return;
  }
  const newChoreWrapper = {} as ChoreCreatorWrapper;
  newChoreWrapper[`/chores/${teamId}/${newChoreKey}`] = newChoreData;

  return update(ref(database), newChoreWrapper);
}

export default function EditChoreList({ navigation, route }: Props) {
  const [chores, setChores] = useState<Chore[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null);

  const [newChoreName, setNewChoreName] = useState('');
  const [newChoreWeight, setNewChoreWeight] = useState('');

  const [activeModal, setActiveModal] = useState('none');

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedChoreName, setEditedChoreName] = useState('');
  const [editedChoreWeight, setEditedChoreWeight] = useState('');

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [teamId, setTeamId] = useState<string | null>('');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const userMail = route.params.userMail;

  useEffect(() => {
    return onValue(ref(database, '/teams'), (snapshot) => {
      snapshot.forEach((team) => {
        const currentTeamMembers = team.val().members as TeamMemberDataSnapshot;
        const currentTeamId = team.key;
        const membersMailAddresses = [];

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

  // fetch chore list
  // TODO team id
  useEffect(() => {
    // do not try to fetch data while teamId is not set
    if (!teamId) {
      return;
    }
    // use return of onValue to cleanup (unsubscribe func)
    return onValue(ref(database, `/chores/${teamId}`), (snapshot) => {
      // reshaping data into an array...
      const choreArray = [] as Chore[];
      snapshot.forEach((chore) => {
        choreArray.push({ choreId: chore.key, ...chore.val() });
      });
      setChores(choreArray);
    });
  }, [teamId]);

  const handleNewChoreName = (text: string) => {
    setNewChoreName(text);
  };

  const handleNewChoreWeight = (weight: string) => {
    setNewChoreWeight(weight);
  };

  const saveChangedChoreValues = (choreId: string) => {
    if (!teamId) {
      return;
    }
    set(ref(database, `chores/${teamId}/${choreId}`), {
      choreName: editedChoreName,
      choreWeight: Number(editedChoreWeight),
    }).catch((error) => {
      console.log(error);
    });
  };

  const removeSelectedChore = () => {
    if (!teamId || !selectedId) {
      return;
    }
    const choreRef = ref(database, `chores/${teamId}/${selectedId}`);
    return remove(choreRef)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

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
            setSelectedChore(null);
          } else {
            setSelectedId(item.choreId);
            const currentChore = chores.find((chore) => {
              return chore.choreId === item.choreId;
            });
            currentChore
              ? setSelectedChore(currentChore)
              : console.log('passed undefined into chore state!');
          }
        }}
        selectedId={selectedId}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        setActiveModal={setActiveModal}
        setShowEditModal={setShowEditModal}
        navigation={{ navigation, route }}
      />
    );
  };

  if (!teamId) {
    return <Text>You need to be in a team first</Text>;
  }

  /* if (!userMail) {
    return <Text>An error occured</Text>;
  } */

  return (
    <>
      <StatusBar translucent={true} />
      <Header label="Edit your team chore list" />
      <View
        style={{
          backgroundColor: showEditModal ? '#bbafaf' : colors.secondary,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeModal !== 'none' ? (
          activeModal === 'editChore' ?
            (<View>
              <EditChoreModal
                setShowEditModal={setShowEditModal}
                selectedId={selectedId}
                selectedChore={selectedChore}
                setName = {setEditedChoreName}
                setWeight={setEditedChoreWeight}
                saveChangedChoreValues={saveChangedChoreValues}
              />
            </View>) : (
              <View>
              <RemoveChoreModal
                setShowEditModal={setShowEditModal}
                selectedId={selectedId}
                selectedChore={selectedChore}
                setName = {setEditedChoreName}
                setWeight={setEditedChoreWeight}
                saveChangedChoreValues={saveChangedChoreValues}
              />
            </View>
            )
        ) : (
          <>
            <Text style={styles.headline}>Add new chore:</Text>
            <View style={styles.inviteBox}>
              <TextInput
                placeholder="Chore name"
                style={styles.formTextInput}
                defaultValue={newChoreName}
                onChangeText={handleNewChoreName}
              />
              <TextInput
                placeholder="Weight"
                style={styles.formWeightInput}
                defaultValue={newChoreWeight}
                onChangeText={handleNewChoreWeight}
              />
              <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => {
                  submitNewChore(newChoreName, newChoreWeight, teamId)?.catch(
                    (error) => console.log(error),
                  );
                }}
              />
            </View>
            <Text style={styles.headline}>Current chore list:</Text>
            <View style={{ width: '80%' }}>
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
          </>
        )}
      </View>
    </>
  );
}
