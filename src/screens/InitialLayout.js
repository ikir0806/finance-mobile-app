import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { signOut } from 'firebase/auth/react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Chip } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { AuthContext } from '../context/AuthContext';
import expensesStore from '../store/store';

const InitialLayout = () => {
  const { control, handleSubmit, watch } = useForm();
  const addNumber = watch('addNumber');
  const subNumber = watch('subNumber');
  const navigation = useNavigation();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);

  const [expenses, setExpenses] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState(0);
  const [expensesArray, setExpensesArray] = useState([]);

  const { user, initialized } = useContext(AuthContext);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = [2019, 2020, 2021, 2022, 2023];
  //   {
  //     month: 'December',
  //     year: 2022,
  //     expense: 12345,
  //   },
  //   {
  //     month: 'January',
  //     year: 2023,
  //     expense: 34500,
  //   },
  //   {
  //     month: 'February',
  //     year: 2023,
  //     expense: 45828,
  //   },
  //   {
  //     month: 'March',
  //     year: 2023,
  //     expense: 97616,
  //   },
  //   {
  //     month: 'April',
  //     year: 2023,
  //     expense: 12953,
  //   },
  //   {
  //     month: 'May',
  //     year: 2023,
  //     expense: 37920,
  //   },
  // ];

  const getExpensesArray = async () => {
    try {
      await getDoc(doc(FIRESTORE_DB, `users/${user.uid}`)).then((doc) => {
        const expensesArray = doc.data()?.expensesArray;
        expensesStore.setExpensesArray(expensesArray);
        const month = months[new Date().getMonth()];
        const year = years.find((year) => year === new Date().getFullYear());
        setCurrentMonth(month);
        setCurrentYear(year);
        expensesStore.setExpenses(
          expensesStore.expensesArray.find((item) => item?.month === month && item.year === year)
            ?.expense,
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getExpensesArray();
    }
  }, [user]);

  useEffect(() => {
    if (currentMonth && currentYear) {
      const newExpense = expensesStore.expensesArray?.find(
        (item) => item.month === currentMonth && item.year === currentYear,
      )?.expense;
      expensesStore.setExpenses(newExpense ? newExpense : 0);
    }
  }, [currentMonth, currentYear]);

  const onLogOut = () => {
    expensesStore.setExpenses(0);
    expensesStore.setExpensesArray([]);
    signOut(FIREBASE_AUTH);
    navigation.navigate('Auth');
  };

  const onAddExpense = async (number) => {
    let isFound = false;
    const newExpensesArray = expensesStore.expensesArray?.map((item) => {
      if (item?.month === currentMonth && item.year === currentYear) {
        isFound = true;
        return {
          ...item,
          expense: (item.expense ? item.expense : 0) + +number,
        };
      } else return item;
    });
    if (!isFound) {
      newExpensesArray.push({
        expense: +number,
        year: currentYear,
        month: currentMonth,
      });
    }
    await updateDoc(doc(FIRESTORE_DB, `users/${user.uid}`), {
      expensesArray: newExpensesArray,
    });

    getExpensesArray();
    expensesStore.addExpenses(number);
  };

  const onSubExpense = (number) => {
    expensesStore.expensesArray.map((item) => {
      if (item?.month === currentMonth && item.year === currentYear) {
        return {
          ...item,
          expense: item.expenses - +number,
        };
      }
    });
    expensesStore.subExpenses(number);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
          <Feather name="menu" size={40} color="#EAECDF" />
        </Pressable>
        <Pressable onPress={onLogOut}>
          <SimpleLineIcons name="logout" size={40} color="#EAECDF" />
        </Pressable>
      </View>
      <View style={styles.expensesWrp}>
        <View style={styles.selectsWrp}>
          <SelectDropdown
            onSelect={(e) => setCurrentMonth(e)}
            showsVerticalScrollIndicator={false}
            rowTextStyle={{
              color: '#627057',
            }} /* 
    rowStyle={{
      borderWidth: 1,
      borderColor: '#627057',
    }} */
            buttonTextStyle={{
              color: '#627057',
            }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#627057',
              borderRadius: 100,
              width: '60%',
            }}
            dropdownStyle={{
              borderWidth: 3,
              borderColor: '#627057',
              borderRadius: 10,
            }}
            data={months}
            defaultValue={currentMonth}
          />
          <SelectDropdown
            onSelect={(e) => setCurrentYear(e)}
            showsVerticalScrollIndicator={false}
            rowTextStyle={{
              color: '#627057',
            }} /* 
    rowStyle={{
      borderWidth: 1,
      borderColor: '#627057',
    }} */
            buttonTextStyle={{
              color: '#627057',
            }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#627057',
              borderRadius: 100,
              width: '40%',
            }}
            dropdownStyle={{
              borderWidth: 3,
              borderColor: '#627057',
              borderRadius: 10,
            }}
            data={years}
            defaultValue={currentYear}
          />
        </View>

        <Text style={styles.expensesTitle}>Expenses sum</Text>
        <Text style={styles.expenses}>
          {expensesStore.expenses?.toLocaleString('ru-RU')} &#8381;
        </Text>
        <View style={styles.buttonsWrp}>
          <Pressable style={styles.roundButtons} onPress={() => setAddModalVisible(true)}>
            <Text style={styles.roundButtonsText}>+</Text>
          </Pressable>
          <Pressable style={styles.roundButtons} onPress={() => setSubModalVisible(true)}>
            <Text style={styles.roundButtonsText}>-</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.chipWrp}>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <MaterialCommunityIcons name="food-variant" size={24} color="#EAECDF" />}>
          {`Food 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <Ionicons name="restaurant" size={24} color="#EAECDF" />}>
          {`Cafe/restaurants 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <Ionicons name="shirt" size={24} color="#EAECDF" />}>
          {`Clothes 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <FontAwesome name="bus" size={24} color="#EAECDF" />}>
          {`Transport 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <FontAwesome5 name="bowling-ball" size={24} color="#EAECDF" />}>
          {`Entertainments 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <AntDesign name="creditcard" size={24} color="#EAECDF" />}>
          {`Transfers 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <AntDesign name="gift" size={24} color="#EAECDF" />}>
          {`Gifts/souvenirs 100`} &#8381;
        </Chip>
        <Chip
          textStyle={styles.chipText}
          style={styles.chip}
          icon={() => <FontAwesome5 name="money-bill" size={24} color="#EAECDF" />}>
          {`Others 100`} &#8381;
        </Chip>
      </View>
      <Modal visible={addModalVisible} transparent style={styles.modal}>
        <KeyboardAvoidingView
          style={{ height: '100%' }}
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setAddModalVisible(false);
                }}>
                <AntDesign name="close" size={40} color="#627057" />
              </Pressable>

              <CustomInput
                name={'addNumber'}
                inputMode={'numeric'}
                control={control}
                placeholder={'0'}
              />
              <CustomButton
                text={'Add'}
                onPress={() => {
                  handleSubmit(onAddExpense(addNumber));
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Modal visible={subModalVisible} transparent style={styles.modal}>
        <KeyboardAvoidingView
          style={{ height: '100%' }}
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
            <View style={styles.modalView}>
              <Pressable style={styles.closeButton} onPress={() => setSubModalVisible(false)}>
                <AntDesign name="close" size={40} color="#627057" />
              </Pressable>

              <CustomInput
                inputMode={'numeric'}
                name={'subNumber'}
                control={control}
                placeholder={'0'}
              />
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
  selectsWrp: {
    gap: 5,
    width: '80%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chipWrp: {
    marginLeft: '5%',
    marginRight: '5%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    gap: 5,
  },
  chip: {
    backgroundColor: '#627057',
  },
  chipText: {
    color: '#EAECDF',
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
    width: '80%',
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

export default observer(InitialLayout);