import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
import {createStackNavigator, createAppContainer, } from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup},
  Main: {screen: Main},
});

const App = createAppContainer(MainNavigator);

export default App;