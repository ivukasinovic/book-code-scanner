import produce from 'immer';
import {
  CREATE_SCAN_SESSION,
  ADD_BOOK_TO_SCAN_SESSION,
  SYNC_SCANNING_SESSIONS,
  DELETE_SESSION,
  EDIT_SCAN_SESSION
} from '../actionTypes/ScannerActionTypes';

const initialState = {
  sessions: [],
  currentSessionName: '',
  upToDate: false
};

const addBookToSession = (sessions, sessionName, book) => {
  let changedSessions = sessions;
  return [
    ...changedSessions.map(
      session =>
        session.sessionName === sessionName
          ? {
              ...session,
              books: [...session.books, book]
            }
          : session
    )
  ];
};

const editScanSession = (sessions, sessionId, newSession) => {
  let changedSessions = sessions;
  return [
    ...changedSessions.map(
      (session, index) =>
        index === sessionId
          ? newSession
          : session
    )
  ];
}

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case CREATE_SCAN_SESSION:
        draft.sessions.push({...action.payload, synced: false});
        draft.upToDate = false;
        draft.currentSessionName = action.payload.sessionName;
        break;
      case EDIT_SCAN_SESSION:
        draft.sessions = editScanSession(state.sessions, action.payload.sessionName, action.payload.newSession)
        break;
      case ADD_BOOK_TO_SCAN_SESSION:
        draft.sessions = addBookToSession(
          state.sessions,
          action.payload.sessionName,
          action.payload.book
        );
        break;
      case SYNC_SCANNING_SESSIONS:
        draft.sessions = state.sessions;
        break;
      case DELETE_SESSION:
        debugger;
        draft.sessions = draft.sessions.filter((session,index) => index !== action.payload.id);
        break;
    }
  });
