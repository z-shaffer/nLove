import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import {Link, Stack} from 'expo-router';
import {supabase} from '../lib/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({email, password});

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Sign up'}} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
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
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? 'Creating account...' : 'Create account'}
      />
      <Link href="/signin" style={styles.textButton}>
        Sign in
      </Link>
    </View>
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
});

export default SignUpScreen;
