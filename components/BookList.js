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

const BookList = ({ books }) => {
  const formatData = () => {
    return books.map((book, index) => ({
      ...book,
      id: index
    }));
  };

  const renderItem = data => {
    return (
      <TouchableHighlight
        style={[styles.card, styles.mb10, styles.mh10]}
        underlayColor={'#AAA'}
      >
        <View style={styles.cardCtn}>
          <Text style={styles.cardTitle}>{data.item.code}</Text>
          <Text style={styles.cardDate}>{data.item.dateTime}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const deleteRow = () => {
    console.log('Deleting book...');
  };

  const renderHiddenItem = data => (
    <View style={[styles.cardBack, styles.mh10]}>
      <Text style={styles.cardBackLeft} />
      <TouchableOpacity
        style={[styles.cardBackBtn, styles.cardBackBtnDelete]}
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
      rightOpenValue={-75}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};

BookList.navigationOptions = () => {
  return { title: 'Session list' };
};

const card = {
  height: 65,
  borderRadius: 8,
  borderColor: '#d5d5d5',
  backgroundColor: 'white'
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
    backgroundColor: '#eb857c'
  },
  backRightBtnRight: {
    backgroundColor: '#eb857c',
    right: 0
  },
  cardCtn: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  cardDate: {
    flexShrink: 0,
    fontSize: 10,
    marginRight: 10
  },
  cardTitle: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 18,
    marginRight: 10
  },
  card: {
    backgroundColor: card.backgroundColor,
    borderColor: card.borderColor,
    borderRadius: card.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: card.height
  },
  mb10: {
    marginBottom: 10
  },
  mh10: {
    marginHorizontal: 10
  },
  cardBack: {
    backgroundColor: card.borderColor,
    borderRadius: card.borderRadius,
    flexDirection: 'row',
    minHeight: card.height,
    overflow: 'hidden'
  },
  cardBackBtn: {
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    minWidth: 75,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardBackBtnDelete: {
    backgroundColor: '#eb857c',
    height:65
  },
  cardBackBtnEdit: {
    backgroundColor: '#58c786',
    borderBottomLeftRadius: card.borderRadius,
    borderTopLeftRadius: card.borderRadius
  },
  cardBackBtnText: {
    color: 'white'
  },
  cardBackLeft: {
    marginBottom: 'auto',
    marginLeft: 10,
    marginRight: 'auto',
    marginTop: 'auto'
  }
});

export default BookList;
