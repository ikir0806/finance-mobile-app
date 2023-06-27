import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();

  const navigation = useNavigation();

  const email = watch('email');

  const onSend = () => {
    sendPasswordResetEmail(FIREBASE_AUTH, email)
      .then(() => navigation.navigate('Auth'))
      .catch((e) => console.log(console.log(e)));
  };

  const onHBackToSignIn = () => {
    navigation.navigate('Auth');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.wrp}>
        <Text style={[styles.header, { marginBottom: 50 }]}> Reset you password </Text>

        <CustomInput
          name={'email'}
          control={control}
          placeholder={'Email'}
          rules={{ required: 'Email can not be empty' }}
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
