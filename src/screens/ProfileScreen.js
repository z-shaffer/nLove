import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

import {getCurrentUser} from 'aws-amplify/auth';

import {generateClient} from 'aws-amplify/api';
import {User} from '../models';
import {DataStore} from 'aws-amplify/datastore';

import {launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('MALE');
  const [lookingFor, setLookingFor] = useState('MALE');
  const [isGenderDropdownVisible, setIsGenderDropdownVisible] = useState(false);
  const [isLookingForDropdownVisible, setIsLookingForDropdownVisible] =
    useState(false);
  const [newImageLocalUri, setNewImageLocalUri] = useState(null);

  const genders = ['MALE', 'FEMALE', 'OTHER'];

  const toggleGenderDropdown = () => {
    setIsGenderDropdownVisible(!isGenderDropdownVisible);
  };

  const toggleLookingForDropdown = () => {
    setIsLookingForDropdownVisible(!isLookingForDropdownVisible);
  };

  const selectGender = selectedGender => {
    setGender(selectedGender);
    toggleGenderDropdown();
  };

  const selectLookingFor = selectedLookingFor => {
    setLookingFor(selectedLookingFor);
    toggleLookingForDropdown();
  };

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (didCancel) {
          return;
        } else if (errorCode) {
          Alert.alert('An error occurred');
          return;
        }
        setNewImageLocalUri(assets[0].uri);
      },
    );
  };

  /* **** API **** */

  const client = generateClient();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user's profile info

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      getCurrentUser().then(userInfo => {
        DataStore.query(User, u => u.sub.eq(userInfo.userId)).then(
          async dbUsers => {
            if (!dbUsers?.length) {
              const newUser = new User({
                sub: userInfo.userId,
                name: '',
                bio: '',
                gender: 'MALE',
                lookingFor: 'MALE',
                images: '',
              });
              await DataStore.save(newUser);
              dbUsers[0] = newUser;
            }
            const currentUser = dbUsers[0];
            setUser(currentUser);
            setName(currentUser.name);
            setBio(currentUser.bio);
            setGender(currentUser.gender);
            setLookingFor(currentUser.lookingFor);
          },
        );
      });
      setIsLoading(false);
    })();
  }, []);

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  // Update profile information

  const save = async () => {
    if (!isValid) {
      Alert.alert('Invalid input');
      return;
    }
    setIsSaving(true);
    DataStore.save(
      User.copyOf(user, updated => {
        updated.name = name;
        updated.bio = bio;
        updated.gender = gender;
        updated.lookingFor = lookingFor;
        updated.images =
          'https://study.com/cimages/videopreview/oqsdgp8y6y.jpg';
      }),
    )
      .then(updatedUser => {
        if (updatedUser) {
          setUser(updatedUser);
          Alert.alert('Profile updated!');
        }
      })
      .catch(e => {
        Alert.alert('Error updating profile:', e);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={pickImage}>
          <Image
            source={{uri: newImageLocalUri ? newImageLocalUri : user?.images}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        </Pressable>
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
        <TouchableOpacity onPress={toggleGenderDropdown}>
          <Text style={styles.dropdownToggle}>{gender || 'Select Gender'}</Text>
        </TouchableOpacity>
        <Modal
          visible={isGenderDropdownVisible}
          transparent
          animationType="slide"
          onRequestClose={toggleGenderDropdown}>
          <TouchableWithoutFeedback onPress={toggleGenderDropdown}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.dropdown}>
              <FlatList
                data={genders}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => selectGender(item)}>
                    <Text style={styles.dropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>
          </View>
        </Modal>
        <Text>Looking for:</Text>
        <TouchableOpacity onPress={toggleLookingForDropdown}>
          <Text style={styles.dropdownToggle}>
            {lookingFor || 'Select Looking For'}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={isLookingForDropdownVisible}
          transparent
          animationType="slide"
          onRequestClose={toggleLookingForDropdown}>
          <TouchableWithoutFeedback onPress={toggleLookingForDropdown}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.dropdown}>
            <FlatList
              data={genders}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => selectLookingFor(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        </Modal>
        <Pressable onPress={save} style={styles.button}>
          {isSaving ? <Text>Saving...</Text> : <Text>Save</Text>}
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
  dropdownToggle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#fefefe',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default ProfileScreen;
