import React from 'react';
import {StyleSheet, View} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.pageContainer}>
        <HomeScreen />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
