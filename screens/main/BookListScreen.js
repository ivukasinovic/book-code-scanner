import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, Modal, View, Button } from 'react-native';
import { sessionsSelector } from '../../store/selectors/ScannerSelector';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import $t from 'i18n';
import BookList from '../../components/BookList';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={() => onPress(item.books)} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.dateTime}>{item.dateTime}</Text>
  </TouchableOpacity>
);

const BookListScreen = () => {
  const sessions = useSelector(sessionsSelector());
  const [selectedSession, setSelectedSession] = useState(null);

  const formatData = () => {
    return sessions.map((session, index) => ({
      id: index,
      title: session.sessionName,
      books: session.books,
      dateTime: session.dateTime
    }));
  };

  const renderItem = ({ item }) => {
    const backgroundColor = '#e8e6e4';
    return (
      <Item item={item} onPress={books => setSelectedSession(books)} style={{ backgroundColor }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={formatData()} renderItem={renderItem} keyExtractor={item => item.id} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={!!selectedSession}
        onRequestClose={() => alert('Modal has been closed.')}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <Button onPress={() => setSelectedSession(null)} title="Close List" />
            <BookList books={selectedSession} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

BookListScreen.navigationOptions = () => {
  return { title: 'Session list' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  dateTime: {
    fontSize: 10,
    textAlign: 'right'
  },
  item: {
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 8,
  },
  title: {
    fontSize: 15
  }
});

export default BookListScreen;
