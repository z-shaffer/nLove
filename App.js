import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Logo from './src/components/Logo';

const App = () => {
  const color = '#fefefe';
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <FontAwesome name="cloud" size={60} color={color} />
          <MatchesScreen />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7e57c2',
    paddingTop: 10,
  },
});

export default App;
