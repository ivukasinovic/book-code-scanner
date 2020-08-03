import { call, put } from 'redux-saga/effects';
import { sessionService } from '../../services/SessionService';
import { Alert } from 'react-native';
import { setLoader } from '../actions/LoaderAction';
import { editScanSession } from '../actions/ScannerActions';

export function* syncSession({ payload }) {
  try {
    yield put(setLoader(true));
    // yield call(sessionService.sendSession, payload);
    yield put(
      editScanSession({
        sessionName: payload.session.id,
        newSession: { ...payload.session, synced: true }
      })
    );
  } catch (error) {
    if (error) {
      Alert.alert('Error occured, check your internet connection');
    }
  } finally {
    yield put(setLoader(false));
  }
}
