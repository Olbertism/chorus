import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  Pressable,
} from 'react-native';
import { colors, styles } from '../../styles/constants';
import { chores, Chore } from '../../util/database/chores';
import { RootStackParamList } from '../../util/types';
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
  <TouchableOpacity
    onPress={onPress}
    style={[styles.flatListItem, backgroundColor]}
  >
    <Text style={[styles.flatListText, textColor]}>{item.choreName}</Text>
  </TouchableOpacity>
);

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>;

export default function NewEntry({ navigation }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        ) : null}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

/* const styles = StyleSheet.create({
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
 */
