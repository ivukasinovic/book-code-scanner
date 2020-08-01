import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    MainStack: MainTabNavigator

  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(AppNavigator);
