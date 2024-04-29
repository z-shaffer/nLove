import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Logo from './src/components/Logo';
import Navigation from './src/components/Navigation';

const App = () => {
  const color = '#fefefe';
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <Logo />
          <HomeScreen />
          <Navigation />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#6d4db1',
    paddingTop: 5,
  },
});

export default App;
