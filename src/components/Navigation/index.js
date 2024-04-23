import React from 'react';
import {StyleSheet, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Navigation = () => {
  const color = '#fefefe';
  return (
    <View style={styles.navigation}>
      <FontAwesome name="cloud" size={24} color={color} />
      <Entypo name="chat" size={24} color={color} />
      <FontAwesome name="user" size={24} color={color} />
      <FontAwesome name="cog" size={24} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 10,
  },
});

export default Navigation;
