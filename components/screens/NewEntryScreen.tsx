import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
} from 'react-native';
import { chores, Chore } from '../../util/database/chores';
import Header from '../Header';

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
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.choreName}</Text>
  </TouchableOpacity>
);

export default function NewEntry({ navigation }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: Chore }) => {
    const backgroundColor = item.choreId === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.choreId === selectedId ? '#fff' : '#000';

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
      <View style={styles.container}>
        <Text>Add a new entry</Text>
        <StatusBar style="auto" />
      </View>
      <SafeAreaView>
        <FlatList
          data={chores}
          renderItem={renderItem}
          keyExtractor={(item) => item.choreId}
          extraData={selectedId}
        />
      </SafeAreaView>
      {selectedId ? (
        <View>
          <Button
            title="Edit default values"
            onPress={() =>
              navigation.navigate('EntryDefaults', {
                choreId: selectedId,
              })
            }
          />
        </View>
      ) : null}
      <View>
        <Button title="Submit" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4a0a0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
