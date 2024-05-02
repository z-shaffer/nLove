import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Pressable} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Logo from './src/components/Logo';
import Navigation from './src/components/Navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure(config);

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = '#CCCCCC';
  const activeColor = '#ffffff';
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <Logo />
          {activeScreen == 'HOME' && <HomeScreen />}
          {activeScreen == 'MATCHES' && <MatchesScreen />}
          <View style={styles.navigation}>
            <Pressable onPress={() => setActiveScreen('HOME')}>
              <FontAwesome
                name="cloud"
                size={24}
                color={activeScreen == 'HOME' ? activeColor : color}
              />
            </Pressable>
            <Pressable onPress={() => setActiveScreen('MATCHES')}>
              <Entypo
                name="chat"
                size={24}
                color={activeScreen == 'MATCHES' ? activeColor : color}
              />
            </Pressable>
            <Pressable onPress={() => setActiveScreen('PROFILE')}>
              <FontAwesome
                name="user"
                size={24}
                color={activeScreen == 'PROFILE' ? activeColor : color}
              />
            </Pressable>
            <Pressable onPress={() => setActiveScreen('SETTINGS')}>
              <FontAwesome
                name="cog"
                size={24}
                color={activeScreen == 'SETTINGS' ? activeColor : color}
              />
            </Pressable>
          </View>
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 7,
  },
});

export default withAuthenticator(App);
