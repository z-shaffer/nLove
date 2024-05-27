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
} from 'react-native';
import {uploadData} from 'aws-amplify/storage';
import {User} from '../models';
import {DataStore} from 'aws-amplify/datastore';
import {launchImageLibrary} from 'react-native-image-picker';
import {getCurrentUser} from 'aws-amplify/auth';

const Onboarding = ({setMe}) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('MALE');
  const [lookingFor, setLookingFor] = useState('MALE');
  const [isGenderDropdownVisible, setIsGenderDropdownVisible] = useState(false);
  const [isLookingForDropdownVisible, setIsLookingForDropdownVisible] =
    useState(false);
  const [newImageLocalUri, setNewImageLocalUri] = useState(null);

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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [identityUser, setIdentityUser] = useState(null);

  useEffect(() => {
    const fetchIdentityUser = async () => {
      setIdentityUser(await getCurrentUser());
    };
    fetchIdentityUser();
  });

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  // *** Update profile information ***

  const save = async () => {
    if (!isValid) {
      Alert.alert('You must have a complete profile to use nLove.');
      return;
    }
    setIsSaving(true);
    var newImage;
    if (newImageLocalUri) {
      newImage = await uploadImage();
      console.log('testing');
    } else {
      Alert.alert('You must upload a photo to use nLove.');
      setIsSaving(false);
      return;
    }
    DataStore.save(
      new User({
        name: name,
        bio: bio,
        gender: gender,
        lookingFor: lookingFor,
        images: awsUrl + newImage,
        sub: identityUser.userId,
      }),
    )
      .then(newUser => {
        if (newUser) {
          setNewImageLocalUri(null);
          Alert.alert('Profile created. Welcome to nLove!');
          setIsSaving(false);
          setMe(newUser);
          return;
        } else {
          Alert.alert('An error occurred');
          setIsSaving(false);
          return;
        }
      })
      .catch(e => {
        Alert.alert('Error updating profile:', e);
        setIsSaving(false);
        return;
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
      const key = `userImages/${identityUser.userId}.${extension}`;
      const result = await uploadData({
        path: key,
        data: blob,
        options: {
          contentType: 'image/' + extension,
        },
      }).result;
      if (result) {
        console.log('returning');
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
    } else {
      return (
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
          }}
          style={styles.image}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            left: '33%',
          }}>
          Welcome to nLove!{' '}
        </Text>
        <Text
          style={{
            color: 'white',
            left: '35%',
          }}>
          Let's get started.
        </Text>
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
          {isSaving ? <Text>Creating...</Text> : <Text>Save</Text>}
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

export default Onboarding;
