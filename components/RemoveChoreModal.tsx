import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/constants';
import { Chore } from '../util/types';

type Props = {
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string | null;
  selectedChore: Chore | null;
};

export default function RemoveChoreModal({
  setShowRemoveModal,
  selectedId,
  selectedChore,
}: Props) {

  if (selectedId === null) {
    setShowRemoveModal(false);
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
              saveChangedChoreValues(selectedId);
              setShowRemoveModal(false);
            }}
          >
            Remove
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => setShowEditModal(false)}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
