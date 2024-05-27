import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';

import {signOut} from 'aws-amplify/auth';
import {DataStore} from 'aws-amplify/datastore';

const SettingsScreen = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const logOut = async () => {
    setLoggingOut(true);
    await DataStore.clear();
    signOut();
    setLoggingOut(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={logOut}>
          {loggingOut ? <Text>Logging Out...</Text> : <Text>Log Out</Text>}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#7e57c2',
    bottom: 15,
  },
  container: {},
});

export default SettingsScreen;
