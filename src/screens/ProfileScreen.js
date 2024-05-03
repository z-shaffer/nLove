import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';

import users from '../../assets/data/users';

import Messages from '../components/Messages';

import {signOut} from 'aws-amplify/auth';

const ProfileScreen = () => {
  const initialUsers = users.slice(0, 4);

  const remainingUsers = users.slice(4);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={() => signOut()}>
          <Text>Log Out</Text>
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

export default ProfileScreen;
