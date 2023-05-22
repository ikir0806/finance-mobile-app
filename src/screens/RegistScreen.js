import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const RegistScreen = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onRegister = () => {
    navigation.navigate('Home');
  };

  const onSignInWithGoogle = () => {};

  const onHaveAnAccount = () => {
    navigation.navigate('Auth');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Registration </Text>

        <CustomInput value={username} setValue={setUsername} placeholder={'Username'} />
        <CustomInput value={login} setValue={setLogin} placeholder={'Login'} />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder={'Password'}
          secureTextEntry
        />
        <CustomInput
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          placeholder={'Repeat password'}
          secureTextEntry
        />
        <CustomButton text={'Register'} onPress={onRegister} />
        <View style={{ marginTop: 100 }}>
          <CustomButton
            text={'Sign in with Google'}
            onPress={onSignInWithGoogle}
            type={'SECONDARY'}
          />
        </View>

        <CustomButton
          text={'Have an account? Sign in'}
          onPress={onHaveAnAccount}
          type={'TERTIARY'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: { marginTop: 50, fontWeight: 'bold', fontSize: 30, color: '#627057' },
});

export default RegistScreen;
