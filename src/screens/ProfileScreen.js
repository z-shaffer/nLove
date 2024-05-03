import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import users from '../../assets/data/users';
import Messages from '../components/Messages';

const ProfileScreen = () => {
  const initialUsers = users.slice(0, 4);

  const remainingUsers = users.slice(4);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text>Profile</Text>
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
