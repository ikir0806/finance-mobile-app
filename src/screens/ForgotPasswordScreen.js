import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onSend = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onHBackToSignIn = () => {
    navigation.navigate('Auth');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Reset you password </Text>

        <CustomInput
          name={'login'}
          control={control}
          placeholder={'Login'}
          rules={{ required: 'Login can not be empty' }}
        />

        <View style={{ marginTop: 20, width: '100%', alignItems: 'center', gap: 20 }}>
          <CustomButton text={'Send'} onPress={handleSubmit(onSend)} />
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

export default ForgotPasswordScreen;
