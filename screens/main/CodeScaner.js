import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  sessionsSelector,
  currentSessionNameSelector
} from '../../store/selectors/ScannerSelector';
import { useSelector, useDispatch } from 'react-redux';
import { addBookToScanSession } from '../../store/actions/ScannerActions';

const CodeScanner = () => {
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const sessions = useSelector(sessionsSelector());
  const currentSessionName = useSelector(currentSessionNameSelector());
  const addBook = payload => dispatch(addBookToScanSession(payload));

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    setScanned(false);
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const session = sessions.find(
      session => session.sessionName === currentSessionName
    );
    if (sessions.length) {
      const bookNoted = session.books.find(book => book === data);
      if (bookNoted) {
        Alert.alert('ScannerInfo', `Book ${data} is already noted!`, [
          { text: 'Ok', onPress: () => setScanned(false) }
        ]);
        return;
      }
      addBook({ sessionName: currentSessionName, bookCode: data });
      Alert.alert('ScannerInfo', `Book ${data} added to the list!`, [
        { text: 'Ok', onPress: () => setScanned(false) }
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code128]}
        style={StyleSheet.absoluteFillObject}
      />

      {!scanned ? (
        <Button title={'Pause'} onPress={() => setScanned(true)} />
      ) : (
        <Button title={'Continue'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

CodeScanner.navigationOptions = () => {
  return { title: 'Code Scanner' };
};

export default CodeScanner;
