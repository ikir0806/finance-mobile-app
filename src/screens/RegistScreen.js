import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import CustomModal from '../components/CustomModal';

const RegistScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const password = watch('password');
  const email = watch('email');
  const login = watch('login');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const onRegister = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then(async function (
        userCredential,
      ) {
        await setDoc(doc(FIRESTORE_DB, `users/${userCredential.user.uid}`), {
          login,
          email: userCredential.user.email,
        });
        navigation.navigate('Home');
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setModalVisible(true);
      setLoading(false);
    }
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
        {loading ? (
          <ActivityIndicator color={'#627057'} />
        ) : (
          <CustomButton text={'Register'} onPress={handleSubmit(onRegister)} />
        )}
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
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={'Registration Error'}
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
});

export default RegistScreen;
