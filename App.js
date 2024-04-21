import React from 'react';
import UserCard from './src/components/UserCard/';
import users from './assets/data/users';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AnimatedStack from './src/components/AnimatedStack';

const App = () => {
  const onSwipeLeft = user => {
    console.warn('Swiped left on', user.name);
  };
  const onSwipeRight = user => {
    console.warn('Swiped right on', user.name);
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.pageContainer}>
        <AnimatedStack
          data={users}
          renderItem={({item}) => <UserCard user={item} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
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
