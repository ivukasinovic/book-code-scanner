import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  sessionsSelector,
  currentSessionNameSelector
} from '../../store/selectors/ScannerSelector';
import { useSelector, useDispatch } from 'react-redux';
import { addBookToScanSession } from '../../store/actions/ScannerActions';
import { format } from 'date-fns';
import SnackBar from 'react-native-snackbar-component';

const CodeScanner = ({ navigation }) => {
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [snackbarColor, setSnackbarColor] = useState('#7cebb5');
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

  const clearSnackBar = () => {
    return setTimeout(() => {
      setScanResult(null);
    }, 5000);
  };

  const finishScannig = () => {
    navigation.navigate('Home');
  };

  const handleBarCodeScanned = ({ data }) => {
    const session = sessions.find(
      session => session.sessionName === currentSessionName
    );
    setScanned(true);
    setTimeout(() => {
      setScanned(false);
    }, 1000);

    if (sessions.length) {
      const bookNoted = session.books.find(book => book.code === data);
      if (bookNoted) {
        setSnackbarColor('#eb857c');
        setScanResult(`Book ${data} is already noted!`);
        clearSnackBar();
        return;
      }
      addBook({
        sessionName: currentSessionName,
        book: { code: data, dateTime: format(new Date(), 'dd-MM-yyyy HH:mm') }
      });

      setSnackbarColor('#58c786');
      setScanResult(`Book ${data} added to the list!`);
      clearSnackBar();
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
      <Button title="Finish" onPress={() => finishScannig()} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code128]}
        style={{...StyleSheet.absoluteFillObject, bottom: 30}}
      />

      <SnackBar
        visible={!!scanResult}
        textMessage={scanResult}
        backgroundColor={snackbarColor}
        position="top"
      />
    </View>
  );
};

CodeScanner.navigationOptions = () => {
  return { title: 'Code Scanner' };
};

export default CodeScanner;
