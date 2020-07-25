import produce from 'immer';
import {
  CREATE_SCAN_SESSION,
  ADD_BOOK_TO_SCAN_SESSION,
  SYNC_SCANNING_SESSIONS,
  DELETE_SESSIONS
} from '../actionTypes/ScannerActionTypes';

const initialState = {
  sessions: [],
  currentSessionName: '',
  upToDate: false
};

const addBookToSession = (sessions, sessionName, book) => {
  debugger;
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

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case CREATE_SCAN_SESSION:
        draft.sessions.push(action.payload);
        draft.upToDate = false;
        draft.currentSessionName = action.payload.sessionName;
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
      case DELETE_SESSIONS:
        return initialState;
    }
  });
