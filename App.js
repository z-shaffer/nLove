import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import Logo from './src/components/Logo';
import Navigation from './src/components/Navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {Amplify} from 'aws-amplify';
import {Hub} from 'aws-amplify/utils';
import {DataStore} from 'aws-amplify/datastore';
import amplifyconfig from './src/amplifyconfiguration.json';
import {withAuthenticator} from '@aws-amplify/ui-react-native';

Amplify.configure({
  ...amplifyconfig,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [isLoading, setIsLoading] = useState(true);

  const color = '#CCCCCC';
  const activeColor = '#ffffff';

  useEffect(() => {
    const listener = Hub.listen('datastore', async hubData => {
      const {event, data} = hubData.payload;
      if (event === 'modelSynced' && data?.model?.name === 'User') {
        console.log(`Model synced successfully: ' ${JSON.stringify(data)}`);
        setIsLoading(false);
      }
    });
    return () => listener();
  }, []);

  const renderPage = () => {
    if (activeScreen === 'HOME') {
      return <HomeScreen isUserLoading={isLoading} />;
    }
    if (isLoading) {
      return <ActivityIndicator style={{flex: 1}} />;
    }
    if (activeScreen === 'MATCHES') {
      return <MatchesScreen />;
    }
    if (activeScreen === 'PROFILE') {
      return <ProfileScreen />;
    }
    if (activeScreen === 'SETTINGS') {
      return <SettingsScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView>
        <View style={styles.pageContainer}>
          <Logo />
          {renderPage()}
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
