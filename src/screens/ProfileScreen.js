import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {generateClient} from 'aws-amplify/api';
import {createUser} from './graphql/mutations';

const client = generateClient();

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState();
  const [lookingFor, setLookingFor] = useState();

  const isNotValid = () => {
    return name && bio && gender && lookingFor;
  };

  const save = async () => {
    if (!isNotValid()) {
      console.warn('An error was encountered.');
      return;
    }
    try {
      const newUser = await client.graphql({
        query: createUser,
        variables: {
          input: {
            name: name,
            image:
              'https://monkey-forest.com/wp-content/uploads/Box-Image-5-800x600.png',
            bio: bio,
            gender: gender,
            lookingFor: lookingFor,
          },
        },
      });
      console.log('New user created:', newUser);
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <Text>Bio:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Bio"
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={setBio}
        />
        <Text>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}
          itemStyle={{height: 100}}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
        <Text>Looking for:</Text>
        <Picker
          selectedValue={lookingFor}
          onValueChange={itemValue => setLookingFor(itemValue)}
          itemStyle={{height: 100}}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#7e57c2',
    bottom: 15,
  },
  container: {},
  button: {
    backgroundColor: '#fefefe',
    height: 25,
    width: 100,
    left: '36%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
  },
});

export default ProfileScreen;
