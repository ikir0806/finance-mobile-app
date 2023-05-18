import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <AuthScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EAECDF',
    fles: 1,
    height: '100%',
  },
});
