import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate('Auth');
  };

  const onHBackToSignIn = () => {
    navigation.navigate('Auth');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Enter your new password </Text>

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

        <View style={{ marginTop: 20, width: '100%', alignItems: 'center', gap: 20 }}>
          <CustomButton text={'Submit'} onPress={handleSubmit(onSubmit)} />
          <CustomButton text={'Back to sign in'} onPress={onHBackToSignIn} type={'TERTIARY'} />
        </View>
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
  header: { marginTop: 200, fontWeight: 'bold', fontSize: 30, color: '#627057' },
});

export default NewPasswordScreen;
