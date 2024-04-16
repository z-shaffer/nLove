import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserCard from './src/components/UserCard/';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <UserCard />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
