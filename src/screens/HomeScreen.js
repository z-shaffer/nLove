import React from 'react';
import UserCard from '../components/UserCard';
import AnimatedStack from '../components/AnimatedStack';
import users from '../../assets/data/users';
import {StyleSheet, View} from 'react-native';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('Swiped left on', user.name);
  };
  const onSwipeRight = user => {
    console.warn('Swiped right on', user.name);
  };
  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <UserCard user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default HomeScreen;
