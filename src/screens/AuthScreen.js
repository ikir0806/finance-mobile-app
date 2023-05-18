import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const AuthScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  const onSignIn = () => {};

  const onForgotPassword = () => {};

  return (
    <View style={styles.wrp}>
      <Text style={styles.header}> Denyushki </Text>
      <Image
        resizeMode='contain'
        source={require('../../assets/images/rich-boy.gif')}
        style={[styles.image, { height: height * 0.3, maxWidth: 400 }]}
      />
      <CustomInput value={login} setValue={setLogin} placeholder={'Login'} />
      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder={'Password'}
        secureTextEntry
      />
      <CustomButton text={'Sign in'} onPress={onSignIn} />
      <CustomButton text={'Forgot password?'} onPress={onForgotPassword} type={'TERTIARY'} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: { marginTop: 50, fontWeight: 'bold', fontSize: 30, color: '#627057' },
  image: {
    width: '70%',
    maxWidth: 400,
  },
});

export default AuthScreen;
