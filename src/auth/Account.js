import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Pressable} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import Logo from '../components/Logo';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Account = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = '#CCCCCC';
  const activeColor = '#ffffff';
  return (
    <View style={styles.pageContainer}>
      <Logo />
      {activeScreen === 'HOME' && <HomeScreen />}
      {activeScreen === 'MATCHES' && <MatchesScreen />}
      {activeScreen === 'PROFILE' && <ProfileScreen />}
      {activeScreen === 'SETTINGS' && <SettingsScreen />}
      <View style={styles.navigation}>
        <Pressable onPress={() => setActiveScreen('HOME')}>
          <FontAwesome
            name="cloud"
            size={24}
            color={activeScreen === 'HOME' ? activeColor : color}
          />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('MATCHES')}>
          <Entypo
            name="chat"
            size={24}
            color={activeScreen === 'MATCHES' ? activeColor : color}
          />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('PROFILE')}>
          <FontAwesome
            name="user"
            size={24}
            color={activeScreen === 'PROFILE' ? activeColor : color}
          />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('SETTINGS')}>
          <FontAwesome
            name="cog"
            size={24}
            color={activeScreen === 'SETTINGS' ? activeColor : color}
          />
        </Pressable>
      </View>
    </View>
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

export default Account;
