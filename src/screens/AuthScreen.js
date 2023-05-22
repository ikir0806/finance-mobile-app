import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignIn = () => {
    navigation.navigate('Home');
  };

  const onRegister = () => {
    navigation.navigate('Regist');
  };

  const onSignInWithGoogle = () => {};

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={{ marginTop: 100 }}>
          <CustomButton
            text={'Sign in with Google'}
            onPress={onSignInWithGoogle}
            type={'SECONDARY'}
          />
        </View>
        <CustomButton
          text={`Don't have an account? Register`}
          onPress={onRegister}
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
  image: {
    width: '70%',
    maxWidth: 400,
  },
});

export default AuthScreen;
