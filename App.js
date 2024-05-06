import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Logo from './src/components/Logo';

import {supabase} from './src/lib/supabase';
import Auth from './src/auth/Auth';
import Account from './src/auth/Account';
import {Session} from '@supabase/supabase-js';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    const onChange = (_event, session) => {
      setSession(session);
    };

    supabase.auth.onAuthStateChange(onChange);

    return () => {
      supabase.auth.removeAuthStateListener(onChange);
    };
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <Logo />
          {session && session.user ? (
            <Account key={session.user.id} session={session} />
          ) : (
            <Auth />
          )}
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

export default App;
