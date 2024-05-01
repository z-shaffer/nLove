import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Navigation = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = '#CCCCCC';
  const activeColor = '#ffffff';
  return (
    <View style={styles.navigation}>
      <Pressable onPress={() => setActiveScreen('HOME')}>
        <FontAwesome
          name="cloud"
          size={24}
          color={activeScreen == 'HOME' ? activeColor : color}
        />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('MATCHES')}>
        <Entypo
          name="chat"
          size={24}
          color={activeScreen == 'MATCHES' ? activeColor : color}
        />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('PROFILE')}>
        <FontAwesome
          name="user"
          size={24}
          color={activeScreen == 'PROFILE' ? activeColor : color}
        />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('SETTINGS')}>
        <FontAwesome
          name="cog"
          size={24}
          color={activeScreen == 'SETTINGS' ? activeColor : color}
        />
      </Pressable>
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
    bottom: 7,
  },
});

export default Navigation;
