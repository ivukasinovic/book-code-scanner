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
  Image
} from 'react-native';
import { sessionsSelector } from '../../store/selectors/ScannerSelector';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import BookList from '../../components/BookList';
import DialogInput from 'react-native-dialog-input';
import {
  editScanSession,
  deleteScanSession,
  syncScanningSession
} from '../../store/actions/ScannerActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { userSelector } from '../../store/selectors/UserSelector';
import syncIcon from '../../assets/icons/sync.png';

const BookListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const editSession = payload => dispatch(editScanSession(payload));
  const deleteSession = payload => dispatch(deleteScanSession(payload));
  const syncSession = payload => dispatch(syncScanningSession(payload));
  const user = useSelector(userSelector());
  const sessions = useSelector(sessionsSelector());
  const [selectedSession, setSelectedSession] = useState(null);
  const [editableSession, setEditableSession] = useState(null);

  const formatData = () => {
    return sessions.map((session, index) => ({
      ...session,
      id: index
    }));
  };

  const sync = session => {
    if (Object.keys(user).length !== 0) {
      syncSession({ session });
      return;
    }
    Alert.alert(
      'Sign in required',
      'You should login before syncing sessions.',
      [{ text: 'Cancel' }, { text: 'Login', onPress: () => navigateToSignIn() }]
    );
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  const deleteRow = id => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete this session?',
      [{ text: 'No' }, { text: 'Yes', onPress: () => deleteSession({ id }) }]
    );
  };

  const renderItem = data => {
    return data ? (
      <TouchableHighlight
        onPress={() => setSelectedSession(data.item.books)}
        style={[styles.card, styles.mb10, styles.mh10]}
        underlayColor={'#AAA'}
      >
        <View style={styles.cardCtn}>
          <View
            style={[styles.cardNum, data.item.synced && styles.cardNumSynced]}
          >
            <Text style={styles.cardNumText}>{data.item.books.length}</Text>
          </View>
          <Text style={styles.cardTitle}>{data.item.sessionName}</Text>
          <Text style={styles.cardDate}>{data.item.dateTime}</Text>
          {!data.item.synced && !!data.item.books.length &&  (
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() => sync(data.item)}
            >
              <Image source={syncIcon} style={styles.cardSyncIcon} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableHighlight>
    ) : (
      <Text style={{ marginTop: 100 }}>No items</Text>
    );
  };

  const renderHiddenItem = data => (
    <View style={[styles.cardBack, styles.mh10]}>
      <Text style={styles.cardBackLeft} />
      <TouchableOpacity
        style={[styles.cardBackBtn, styles.cardBackBtnEdit]}
        onPress={() => setEditableSession(data.item)}
      >
        <Text style={styles.cardBackBtnText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cardBackBtn, styles.cardBackBtnDelete]}
        onPress={() => deleteRow(data.item.id)}
      >
        <Text style={styles.cardBackBtnText}>Delete</Text>
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
            newSession: { ...editableSession, sessionName: inputText }
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

const card = {
  height: 65,
  borderRadius: 8,
  borderColor: '#d5d5d5',
  backgroundColor: 'white'
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: card.backgroundColor,
    borderColor: card.borderColor,
    borderRadius: card.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: card.height
  },
  cardAction: {
    alignItems: 'center',
    backgroundColor: card.borderColor,
    borderRadius: 4,
    flexShrink: 0,
    height: 35,
    justifyContent: 'center',
    width: 35
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
    backgroundColor: '#eb857c'
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
  cardNum: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
    width: 40
  },
  cardNumSynced: {
    backgroundColor: '#3e6f35'
  },
  cardNumText: {
    color: 'white',
    fontWeight: 'bold'
  },
  cardSyncIcon: {
    height: 20,
    width: 20
  },
  cardTitle: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 18,
    marginRight: 10
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  dateTime: {
    fontSize: 10,
    textAlign: 'right'
  },
  mb10: {
    marginBottom: 10
  },
  mh10: {
    marginHorizontal: 10
  }
});

export default BookListScreen;
