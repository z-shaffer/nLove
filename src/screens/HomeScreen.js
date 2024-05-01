import React from 'react';
import UserCard from '../components/UserCard';
import AnimatedStack from '../components/AnimatedStack';
import users from '../../assets/data/users';
import {StyleSheet, View} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

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
      <View style={styles.icons}>
        <View style={styles.button}>
          <Fontisto name="frowning" size={40} color="#FF6B6B" />
        </View>
        <View style={styles.button}>
          <Fontisto name="undo" size={40} color="#FFD166" />
        </View>
        <View style={styles.button}>
          <Fontisto name="heart-eyes" size={40} color="#00b894" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#7e57c2',
    bottom: 15,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '8%',
    padding: 0,
    bottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d4db1',
    paddingLeft: 2,
    borderRadius: 50,
  },
});

export default HomeScreen;
