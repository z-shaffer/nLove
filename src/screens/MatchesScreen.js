import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import users from '../../assets/data/users';

const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#ffffff'}}>
          Matches
        </Text>
        <View style={styles.users}>
          {users.map(user => (
            <View style={styles.user} key={user.id}>
              <Image source={{uri: user.image}} style={styles.image} />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 65,
    height: 65,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  nuser: {
    width: 65,
    height: 65,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default MatchesScreen;
