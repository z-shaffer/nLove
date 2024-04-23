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
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <Logo />
          <MatchesScreen />
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
    backgroundColor: '#7e57c2',
    paddingTop: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 10,
  },
});

export default App;
