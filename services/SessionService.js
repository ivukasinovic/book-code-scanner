import ApiService from './ApiService';

const ENDPOINTS = {
  SESSION: '/session'
};

class SessionService extends ApiService {
  sendSession = ({ session }) => {
    return this.apiClient.post(ENDPOINTS.SESSION, session);
  };
}

export const sessionService = new SessionService();
