import React from 'react';
import UserCard from './src/components/UserCard/';
import users from './assets/data/users';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AnimatedStack from './src/components/AnimatedStack';

const App = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.pageContainer}>
        <AnimatedStack
          data={users}
          renderItem={({item}) => <UserCard user={item} />}
        />
      </View>
    </GestureHandlerRootView>
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
