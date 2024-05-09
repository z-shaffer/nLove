import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';

const VerificationScreen = ({setActiveScreen}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Verification e-mail sent. Please check your inbox and use the link
        provided.
      </Text>
      <Pressable onPress={() => setActiveScreen('SIGNIN')}>
        <Text style={styles.textButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
    bottom: '12%',
  },
  subtitle: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    bottom: '12%',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
});

export default VerificationScreen;
