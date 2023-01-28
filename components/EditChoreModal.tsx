import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/constants';
import { Chore } from '../util/types';

type Props = {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string | null;
  selectedChore: Chore | null;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  saveChangedChoreValues: (choreId: string) => void;
};

export default function EditChoreModal({
  setShowEditModal,
  selectedId,
  selectedChore,
  setName,
  setWeight,
  saveChangedChoreValues,
}: Props) {

  const handleNewChoreNameChange = (newName: string) => {
    setName(newName);
  };

  const handleNewChoreWeightChange = (newWeight: string) => {
    setWeight(newWeight);
  };

  if (selectedId === null) {
    setShowEditModal(false);
    return <Text>An error occurred while selecting a chore</Text>;
  }

  return (
    <View style={styles.modalWrapper}>
      <Text style={styles.text}>
        Edit values for {selectedChore?.choreName}
      </Text>
      <View style={{ display: 'flex' }}>
        <Text style={styles.text}>Name:</Text>
        <TextInput
          placeholder={selectedChore?.choreName}
          style={styles.modalTextInput}
          defaultValue={selectedChore?.choreName}
          onChangeText={handleNewChoreNameChange}
        />
      </View>
      <View style={{ display: 'flex', marginBottom: 5 }}>
        <Text style={styles.text}>Weight:</Text>
        <TextInput
          placeholder={selectedChore?.choreWeight.toString()}
          style={styles.modalWeightInput}
          defaultValue={selectedChore?.choreWeight.toString()}
          onChangeText={handleNewChoreWeightChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              saveChangedChoreValues(selectedId);
              setShowEditModal(false);
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => setShowEditModal(false)}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
