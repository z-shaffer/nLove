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
  ActivityIndicator,
} from 'react-native';
import {getCurrentUser} from 'aws-amplify/auth';
import {uploadData} from 'aws-amplify/storage';
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
  const [imageLoading, setImageLoading] = useState(true);

  const genders = ['MALE', 'FEMALE', 'OTHER'];
  const awsUrl =
    'https://nlove9a07e4b855434532bc5ac399b3e72ecdc72bb-dev.s3.amazonaws.com/';

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

  /* **** API **** */

  const client = generateClient();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      getCurrentUser().then(userInfo => {
        DataStore.query(User, u => u.sub.eq(userInfo.userId)).then(
          async dbUsers => {
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

  // *** Update profile information ***

  const save = async () => {
    if (!isValid) {
      Alert.alert('Invalid input');
      return;
    }
    setIsSaving(true);
    var newImage;
    if (newImageLocalUri) {
      newImage = await uploadImage();
    }
    DataStore.save(
      User.copyOf(user, updated => {
        updated.name = name;
        updated.bio = bio;
        updated.gender = gender;
        updated.lookingFor = lookingFor;
        if (newImage) {
          updated.images = awsUrl + newImage;
          setNewImageLocalUri(null);
        }
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

  const uploadImage = async event => {
    try {
      const response = await fetch(newImageLocalUri);
      const blob = await response.blob();
      const urlParts = newImageLocalUri.split('.');
      const extension = urlParts[urlParts.length - 1];
      const key = `userImages/${user.sub}.${extension}`;
      const result = await uploadData({
        path: key,
        data: blob,
        options: {
          contentType: 'image/' + extension,
        },
      }).result;
      if (result) {
        return key;
      }
    } catch (e) {
      console.log(e);
    }
    return '';
  };

  const renderImage = () => {
    if (newImageLocalUri) {
      return <Image source={{uri: newImageLocalUri}} style={styles.image} />;
    } else if (imageLoading && user?.images) {
      return (
        <>
          <Text> Loading. . .</Text>
          <Image
            source={{uri: user?.images}}
            style={styles.image}
            onLoadEnd={() => setImageLoading(false)}
          />
        </>
      );
    } else if (user?.images) {
      return <Image source={{uri: user?.images}} style={styles.image} />;
    } else {
      return (
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/white-blank-background-texture-design-element_53876-132773.jpg',
          }}
          style={styles.image}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={pickImage}>{renderImage()}</Pressable>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfileScreen;
