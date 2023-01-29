import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/constants';
import { Chore } from '../util/types';
import { ModalType } from './screens/EditChoreListScreen';

type Props = {
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
  selectedId: string | null;
  selectedChore: Chore | null;
  removeSelectedChore: () => void;
};

export default function RemoveChoreModal({
  setActiveModal,
  selectedId,
  selectedChore,
  removeSelectedChore,
}: Props) {

  if (selectedId === null) {
    setActiveModal('none');
    return <Text>An error occurred while selecting a chore</Text>;
  }

  return (
    <View style={styles.modalWrapper}>
      <Text style={styles.text}>
        Do you really want to remove {selectedChore?.choreName}
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              removeSelectedChore();
              setActiveModal('none');
            }}
          >
            Remove
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => setActiveModal('none')}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
