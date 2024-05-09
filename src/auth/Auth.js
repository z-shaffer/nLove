import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Pressable} from 'react-native';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';

import Logo from '../components/Logo';

const Auth = () => {
  const [activeScreen, setActiveScreen] = useState('SIGNIN');
  const color = '#CCCCCC';
  const activeColor = '#ffffff';
  return (
    <View style={styles.pageContainer}>
      <Logo />
      {activeScreen === 'SIGNIN' && (
        <SignInScreen setActiveScreen={setActiveScreen} />
      )}
      {activeScreen === 'SIGNUP' && (
        <SignUpScreen setActiveScreen={setActiveScreen} />
      )}
      {activeScreen === 'VERIFICATION' && (
        <VerificationScreen setActiveScreen={setActiveScreen} />
      )}
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

export default Auth;
