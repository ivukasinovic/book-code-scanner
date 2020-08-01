import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  Modal,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { sessionsSelector } from '../../store/selectors/ScannerSelector';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import BookList from '../../components/BookList';
import DialogInput from 'react-native-dialog-input';
import { editScanSession, deleteScanSession, syncScanningSession } from '../../store/actions/ScannerActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { userSelector } from '../../store/selectors/UserSelector';

const BookListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const editSession = payload => dispatch(editScanSession(payload));
  const deleteSession = payload => dispatch(deleteScanSession(payload));
  const syncSession = payload  => dispatch(syncScanningSession(payload));
  const user = useSelector(userSelector());
  const sessions = useSelector(sessionsSelector());
  const [selectedSession, setSelectedSession] = useState(null);
  const [editableSession, setEditableSession] = useState(null);

  const formatData = () => {
    return sessions.map((session, index) => ({
      ...session,
      id: index,
    }));
  };
  
  const sync = session => {
    //TODO check if user is logged in
    if(Object.keys(user).length !== 0){
      syncSession({session});
      return;
    }
    Alert.alert(
      'Sign in required',
      'You should login before syncing sessions.',
      [
        { text: 'Cancel' },
        { text: 'Login', onPress: () => navigateToSignIn()}
      ]
    );
    editSession({sessionName: session.id, newSession: {...session, synced: true}});
  }

  const navigateToSignIn = () => {
    navigation.navigate('SignInScreen')
  };

  const deleteRow = (id) => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete this session?',
      [
        { text: 'No' },
        { text: 'Yes', onPress: () => deleteSession({id})}
      ]
    );
  };

  const renderItem = data => {
    return (
      <TouchableHighlight
        onPress={() => setSelectedSession(data.item.books)}
        style={styles.rowFront}
        underlayColor={'#AAA'}
      >
        <View style={styles.itemView}>
          <Text>{`Synced ${data.item.synced ? 'Yes' : 'No'}`}</Text>
          <Text>{`No:${data.item.books.length}`}</Text>
          <Text style={styles.sessionName}>{data.item.sessionName}</Text>
          <Text style={styles.dateTime}>{data.item.dateTime}</Text>
          <Button title="SYNC" onPress={() => sync(data.item)}></Button>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => setEditableSession(data.item)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={!!selectedSession}
        onRequestClose={() => alert('Modal has been closed.')}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <Button
              onPress={() => setSelectedSession(null)}
              title="Close List"
            />
            <BookList books={selectedSession} />
          </View>
        </SafeAreaView>
      </Modal>
      <DialogInput
        isDialogVisible={!!editableSession}
        title={'Session Name'}
        message={'Change session name'}
        initValueTextInput={editableSession && editableSession.sessionName}
        submitInput={inputText => {
          editSession({
            sessionName: editableSession.id,
            newSession: {...editableSession, sessionName: inputText}
          });
          setEditableSession(null);
        }}
        closeDialog={() => setEditableSession(null)}
      />
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
    flex: 1,
  },
  itemView: {
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: '#58c786',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: '#eb857c',
    right: 0
  }
});

export default BookListScreen;
