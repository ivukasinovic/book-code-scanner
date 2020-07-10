import {
  CREATE_SCAN_SESSION,
  ADD_BOOK_TO_SCAN_SESSION,
  SYNC_SCANNING_SESSIONS,
  DELETE_SESSIONS
} from '../actionTypes/ScannerActionTypes';

export const createScanSession = payload => ({
  type: CREATE_SCAN_SESSION,
  payload
});

export const addBookToScanSession = payload => ({
  type: ADD_BOOK_TO_SCAN_SESSION,
  payload
});

export const syncScanningSession = payload => ({
  type: SYNC_SCANNING_SESSIONS,
  payload
});

export const deleteSessions = payload => ({
  type: DELETE_SESSIONS,
  payload
});
