import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const ConfirmEmailScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onConfirm = () => {
    navigation.navigate('NewPassword');
  };

  const onHBackToSignIn = () => {};

  const onResendCode = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Confirm your email </Text>

        <CustomInput
          name={'login'}
          control={control}
          placeholder={'Login'}
          rules={{ required: 'Login can not be empty' }}
        />
        <CustomInput
          name={'code'}
          control={control}
          placeholder={'Enter your code'}
          rules={{ required: 'Code can not be empty' }}
        />

        <View style={{ marginTop: 20, width: '100%', alignItems: 'center', gap: 20 }}>
          <CustomButton text={'Confirm'} onPress={handleSubmit(onConfirm)} />
          <CustomButton text={'Resend code'} onPress={onResendCode} type={'SECONDARY'} />
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

export default ConfirmEmailScreen;
