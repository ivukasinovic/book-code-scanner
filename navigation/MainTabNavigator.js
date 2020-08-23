import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main/HomeScreen';
import LeftSlider from '../screens/main/LeftSlider';
import ChangePassword from '../screens/main/profile/ChangePassword';
import EditProfile from '../screens/main/profile/EditProfile';
import CodeScanner from '../screens/main/CodeScaner';
import BookListScreen from '../screens/main/BookListScreen';
import SignInScreen from '../screens/auth/SignInScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  CodeScanner: CodeScanner,
  ChangePassword,
  EditProfile
});

/* eslint-disable react/prop-types, react/display-name */
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'} />
  )
};

const ListStack = createStackNavigator({
  List: BookListScreen
});
ListStack.navigationOptions = {
  tabBarLabel: 'Session List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
  )
};

const SignInStack = createStackNavigator({
  SignInScreen: SignInScreen
});
SignInStack.navigationOptions = {
  tabBarLabel: 'Sign In',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'} />
  )
};

const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,
  ListStack,
  SignInStack
});

export default createDrawerNavigator(
  {
    BottomTabNavigator: BottomTabNavigator
  },
  {
    contentComponent: LeftSlider
  }
);
