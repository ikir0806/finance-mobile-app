import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  Platform,
} from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';

const HomeScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const addNumber = watch('addNumber');
  const subNumber = watch('subNumber');
  const navigation = useNavigation();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);

  const [expenses, setExpenses] = useState(0);

  const onLogOut = () => {
    navigation.navigate('Auth');
  };

  const onAddExpense = (number) => {
    setExpenses(expenses + +number);
  };

  const onSubExpense = (number) => {
    setExpenses(expenses - +number);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
          <Feather name='menu' size={40} color='#EAECDF' />
        </Pressable>
        <Pressable onPress={onLogOut}>
          <SimpleLineIcons name='logout' size={40} color='#EAECDF' />
        </Pressable>
      </View>
      <View style={styles.expensesWrp}>
        <Text style={styles.expensesTitle}>Сумма расходов</Text>
        <Text style={styles.expenses}>{expenses}</Text>
        <View style={styles.buttonsWrp}>
          <Pressable style={styles.roundButtons} onPress={() => setAddModalVisible(true)}>
            <Text style={styles.roundButtonsText}>+</Text>
          </Pressable>
          <Pressable style={styles.roundButtons} onPress={() => setSubModalVisible(true)}>
            <Text style={styles.roundButtonsText}>-</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={addModalVisible} transparent style={styles.modal}>
        <KeyboardAvoidingView
          style={{ height: '100%' }}
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setAddModalVisible(false);
                }}>
                <AntDesign name='close' size={40} color='#627057' />
              </Pressable>

              <CustomInput name={'addNumber'} control={control} placeholder={'0'} />
              <CustomButton text={'Add'} onPress={() => handleSubmit(onAddExpense(addNumber))} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Modal visible={subModalVisible} transparent style={styles.modal}>
        <KeyboardAvoidingView
          style={{ height: '100%' }}
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
            <View style={styles.modalView}>
              <Pressable style={styles.closeButton} onPress={() => setSubModalVisible(false)}>
                <AntDesign name='close' size={40} color='#627057' />
              </Pressable>

              <CustomInput name={'subNumber'} control={control} placeholder={'0'} />
              <CustomButton
                text={'Subtract'}
                onPress={() => handleSubmit(onSubExpense(subNumber))}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  expensesWrp: {
    gap: 20,
    margin: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#627057',
  },
  expensesTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#627057',
  },
  expenses: {
    textAlign: 'center',
    fontSize: 40,
    color: '#627057',
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
  closeButton: { position: 'absolute', top: 5, right: 5 },
  buttonsWrp: {
    gap: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '70%',
  },
  roundButtons: {
    backgroundColor: '#627057',
    borderRadius: 100,
    width: 50,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonsText: {
    textAlign: 'center',
    color: '#EAECDF',
    fontSize: 30,
    marginBottom: 10,
  },
});

export default HomeScreen;
