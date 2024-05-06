import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import {createClient} from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: key => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: key => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://hkwbvcfnhigrdruhajdk.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhrd2J2Y2ZuaGlncmRydWhhamRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMDE4NzgsImV4cCI6MjAzMDU3Nzg3OH0.UTsXqBko0P8BZwZnTGh_YGLurDHwAIU2Tcn9j7fvPxA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
