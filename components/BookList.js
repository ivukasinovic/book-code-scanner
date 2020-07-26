import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.dateTime}>{item.dateTime}</Text>
  </TouchableOpacity>
);

const BookList = ({ books }) => {
  const formatData = () => {
    return books.map((book, index) => ({
      id: index,
      title: book.code,
      dateTime: book.dateTime
    }));
  };

  const renderItem = ({ item }) => {
    const backgroundColor = '#e8e6e4';
    return <Item item={item} onPress={() => {}} style={{ backgroundColor }} />;
  };

  return <FlatList data={formatData()} renderItem={renderItem} keyExtractor={item => item.id} />;
};

BookList.navigationOptions = () => {
  return { title: 'Session list' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateTime: {
    fontSize: 10,
    textAlign: 'right'
  },
  item: {
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8
  },
  title: {
    fontSize: 15
  }
});

export default BookList;
