import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const { height } = useWindowDimensions();

  const onConfirm = () => {
    navigation.navigate('NewPassword');
  };

  const onHBackToSignIn = () => {};

  const onResendCode = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Confirm your email </Text>

        <CustomInput value={username} setValue={setUsername} placeholder={'Username'} />
        <CustomInput value={code} setValue={setCode} placeholder={'Enter your code'} />

        <View style={{ marginTop: 20, width: '100%', alignItems: 'center', gap: 20 }}>
          <CustomButton text={'Confirm'} onPress={onConfirm} />
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
