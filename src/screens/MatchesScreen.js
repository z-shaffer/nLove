import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import users from '../../assets/data/users';
import {ScrollView} from 'react-native-gesture-handler';

const MatchesScreen = () => {
  const initialUsers = users.slice(0, 4);

  const remainingUsers = users.slice(4);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <FlatList
          data={users}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.user}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {},
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 65,
    height: 65,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
  },
  newser: {
    width: 65,
    height: 65,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default MatchesScreen;
