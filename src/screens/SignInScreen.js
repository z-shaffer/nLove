import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {supabase} from '../lib/supabase';

import Button from '../components/Button';

const SignInScreen = ({setActiveScreen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>nLove.</Text>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="(999) 999-9999"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />
      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Pressable onPress={() => setActiveScreen('SIGNUP')}>
        <Text style={styles.textButton}>Create an account</Text>
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
  label: {
    color: 'white',
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
    textAlign: 'right',
    bottom: '12%',
    right: '48%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
});

export default SignInScreen;
