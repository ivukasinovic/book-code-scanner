import React from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import { sessionsSelector } from '../../store/selectors/ScannerSelector';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const BookListScreen = () => {
  const sessions = useSelector(sessionsSelector());

  const formatData = () => {
    return sessions.map((session, index) => ({
      id: index,
      title: session.sessionName
    }));
  };

  const renderItem = ({ item }) => {
    const backgroundColor = '#e8e6e4';

    return <Item item={item} onPress={() => {}} style={{ backgroundColor }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={formatData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

BookListScreen.navigationOptions = () => {
  return { title: 'Book list' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20
  },
  title: {
    fontSize: 15
  }
});

export default BookListScreen;
