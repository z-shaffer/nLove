import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Image source={{
        uri: 'https://img.a.transfermarkt.technology/portrait/big/418560-1709108116.png'
      }} 
      style={{
        width: 250, height: 250
      }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
})

export default App;