import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Button,
  StatusBar
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from 'react-navigation';

const BookList = ({ books }) => {
  const formatData = () => {
    return books.map((book, index) => ({
      ...book,
      id: index
    }));
  };

  const renderItem = data => {
    return (
      <TouchableHighlight style={styles.rowFront} underlayColor={'#AAA'}>
        <View style={styles.itemView}>
          <Text style={styles.sessionName}>{data.item.code}</Text>
          <Text style={styles.dateTime}>{data.item.dateTime}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const deleteRow = () => {
    console.log('Deleting book...');
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={() => deleteRow(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    // <SafeAreaView style={styles.container}>
      <SwipeListView
        data={formatData()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
  );
};

BookList.navigationOptions = () => {
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
    marginVertical: 4,
    padding: 8
  },
  title: {
    fontSize: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    flex: 1
  },
  itemView: {
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#eb857c',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    backgroundColor: '#eb857c',
  },
  backRightBtnRight: {
    backgroundColor: '#eb857c',
    right: 0
  }
});

export default BookList;
