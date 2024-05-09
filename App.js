import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {supabase} from './src/lib/supabase';
import Account from './src/auth/Account';
import {Session} from '@supabase/supabase-js';
import Auth from './src/auth/Auth';

import Colors from './src/constants/Colors';

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
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
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
    backgroundColor: Colors.theme.hex,
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
