import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth/react-native';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomModal from '../components/CustomModal';

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
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then(
        async (userCredential) => {
          await updateDoc(doc(FIRESTORE_DB, `users/${userCredential.user.uid}`), {
            expensesArray: [
              {
                month: 'December',
                year: 2022,
                expense: 12345,
              },
              {
                month: 'January',
                year: 2023,
                expense: 34500,
              },
              {
                month: 'February',
                year: 2023,
                expense: 45828,
              },
              {
                month: 'March',
                year: 2023,
                expense: 97616,
              },
              {
                month: 'April',
                year: 2023,
                expense: 12953,
              },
              {
                month: 'May',
                year: 2023,
                expense: 37920,
              },
            ],
          });
          navigation.navigate('Home');
        },
      );
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
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.wrp}>
        <Text style={styles.header}> Denyushki </Text>
        <Image
          resizeMode="contain"
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
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={'Authtorization Error'}
      />
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
