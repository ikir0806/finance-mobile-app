import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const RegistScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const password = watch('password');

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
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Registration </Text>

        <CustomInput
          name={'login'}
          control={control}
          placeholder={'Login'}
          rules={{ required: 'Login can not be empty' }}
        />
        <CustomInput
          name={'email'}
          control={control}
          placeholder={'Email'}
          rules={{ required: 'Email can not be empty' }}
        />
        <CustomInput
          name={'password'}
          control={control}
          placeholder={'Password'}
          rules={{ required: 'Password can not be empty' }}
          secureTextEntry
        />
        <CustomInput
          name={'passwordRepeat'}
          control={control}
          placeholder={'Repeat password'}
          rules={{
            validate: (value) => value == password || 'Password do not match',
          }}
          secureTextEntry
        />
        <CustomButton text={'Register'} onPress={handleSubmit(onRegister)} />
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
