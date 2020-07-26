import { createSelector } from 'reselect';

const scannerStateSelector = state => state.ScannerReducer;

export const sessionsSelector = () =>
  createSelector(scannerStateSelector, scanner => scanner.sessions);

export const currentSessionNameSelector = () =>
  createSelector(scannerStateSelector, scanner => scanner.currentSessionName);
