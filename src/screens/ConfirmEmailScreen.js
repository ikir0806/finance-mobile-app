import { useNavigation } from '@react-navigation/native';
import { confirmPasswordReset } from 'firebase/auth/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const ConfirmEmailScreen = () => {
  const { control, handleSubmit, watch } = useForm();

  const code = watch('code');

  const navigation = useNavigation();

  const onConfirm = () => {
    confirmPasswordReset(FIREBASE_AUTH, code)
      .then(() => {
        navigation.navigate('Auth');
      })
      .catch((error) => console.log(error));
  };

  const onHBackToSignIn = () => {
    navigation.navigate('Auth');
  };

  const onResendCode = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 20 }]}> Confirm your email </Text>

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
