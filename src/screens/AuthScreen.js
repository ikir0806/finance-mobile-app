import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const AuthScreen = () => {
  const { control, handleSubmit } = useForm();
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
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={styles.header}> Denyushki </Text>
        <Image
          resizeMode='contain'
          source={require('../../assets/images/rich-boy.gif')}
          style={[styles.image, { height: height * 0.3, maxWidth: 400 }]}
        />
        <CustomInput
          name={'login'}
          control={control}
          placeholder={'Login'}
          rules={{ required: 'Login can not be empty' }}
        />
        <CustomInput
          name={'password'}
          control={control}
          placeholder={'Password'}
          rules={{ required: 'Password can not be empty' }}
          secureTextEntry
        />
        <CustomButton text={'Sign in'} onPress={handleSubmit(onSignIn)} />
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
