import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const Logo = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#ffffff'}}>
          nLove
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
});

export default Logo;
