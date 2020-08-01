import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

class Info extends React.Component {
  render() {
    return <ExpoConfigView />;
  }
}

class About extends React.Component {
  render() {
    return <ExpoConfigView />;
  }
}

export default createMaterialTopTabNavigator(
  {
    Info,
    About
  },
  {
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true
    }
  }
);
