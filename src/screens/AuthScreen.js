import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth/react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { Modal } from 'react-native';

const AuthScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { height } = useWindowDimensions();
  const password = watch('password');
  const email = watch('email');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then(() => {
        navigation.navigate('Home');
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setModalVisible(true);
      setLoading(false);
    }
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
        {loading ? (
          <ActivityIndicator color={'#627057'} />
        ) : (
          <CustomButton text={'Sign in'} onPress={handleSubmit(onSignIn)} />
        )}
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
      <Modal visible={modalVisible} transparent style={styles.modal}>
        <KeyboardAvoidingView
          style={{ height: '100%' }}
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Authorization Error</Text>
              <CustomButton text={'Ok'} onPress={() => setModalVisible(false)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '70%',
    marginBottom: '70%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#627057',
    fontSize: 18,
  },
});

export default AuthScreen;
