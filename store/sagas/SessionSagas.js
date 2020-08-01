import { call, put } from 'redux-saga/effects';
import { sessionService } from '../../services/SessionService';
import { Alert } from 'react-native';
import { setGlobalError } from '../actions/ErrorActions';
import { setLoader } from '../actions/LoaderAction';

export function* syncSession({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(sessionService.sendSession, payload);
    // yield call(sessionService.sendSession, payload);
  } catch (error) {
    if (error) {
      Alert.alert('Error occured, check your internet connection');
    }
  } finally {
    yield put(setLoader(false));
  }
}
