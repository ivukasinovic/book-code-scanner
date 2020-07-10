import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import $t from 'i18n';
import { logout } from '../../store/actions/UserActions';
import { createScanSession } from '../../store/actions/ScannerActions';
import { userSelector } from '../../store/selectors/UserSelector';
import NavigationService from '../../services/NavigationService';
import { sessionsSelector } from '../../store/selectors/ScannerSelector';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());
  const createSession = payload => dispatch(createScanSession(payload));
  const user = useSelector(userSelector());
  const [modalVisible, setModalVisible] = useState(false);
  const sessions = useSelector(sessionsSelector());

  const _signOutAsync = async () => {
    handleLogout();
  };

  const startScanninSession = () => {
    console.log('sessions', sessions);
    createSession({ sessionName: `session${sessions.length}`, books: [] });
    NavigationService.navigate('CodeScanner');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          {user && <Text>{user.email}</Text>}
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.welcomeImage}
          />
        </View>

        <Button onPress={() => startScanninSession()} title="Start scanning!" />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => alert('Modal has been closed.')}
        >
          <SafeAreaView style={styles.container}>
            <View>
              <Text>{$t('helloWorld')}</Text>

              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Hide Modal"
              />
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>

      <View style={styles.tabBarInfoContainer} />
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  // const headerLeftNav = addHeaderLeftNavigator(navigation);
  return { title: 'FTN Bookshelf' };
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },

  tabBarInfoContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  welcomeImage: {
    height: 120,
    marginLeft: -10,
    marginTop: 3,
    resizeMode: 'contain',
    width: 400
  }
});
