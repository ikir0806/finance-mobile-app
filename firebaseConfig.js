import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCVDlmEFjKxO8d4BqKLncf1Vp1pwea44-8',
  authDomain: 'finance-mobile.firebaseapp.com',
  projectId: 'finance-mobile',
  storageBucket: 'finance-mobile.appspot.com',
  messagingSenderId: '973181674851',
  appId: '1:973181674851:web:c08d7a1b623f10f9da1f56',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
