import {
  CREATE_SCAN_SESSION,
  ADD_BOOK_TO_SCAN_SESSION,
  SYNC_SCANNING_SESSIONS,
  DELETE_SESSION,
  EDIT_SCAN_SESSION,
  EDIT_BOOK_TO_SCAN_SESSION,
  DELETE_BOOK
} from '../actionTypes/ScannerActionTypes';

export const createScanSession = payload => ({
  type: CREATE_SCAN_SESSION,
  payload
});

export const editScanSession = payload => ({
  type: EDIT_SCAN_SESSION,
  payload
});


export const addBookToScanSession = payload => ({
  type: ADD_BOOK_TO_SCAN_SESSION,
  payload
});

export const editBookToSession = payload => ({
  type: EDIT_BOOK_TO_SCAN_SESSION,
  payload
});

export const syncScanningSession = payload => ({
  type: SYNC_SCANNING_SESSIONS,
  payload
});

export const deleteScanSession = payload => ({
  type: DELETE_SESSION,
  payload
});


export const deleteBook = payload => ({
  type: DELETE_BOOK,
  payload
});

