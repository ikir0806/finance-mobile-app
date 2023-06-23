import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

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

  const categories = [
    {
      key: 1,
      value: 'food',
      label: 'Food',
    },
    {
      key: 2,
      value: 'cafe',
      label: 'Cafe/restaurants',
    },
    {
      key: 3,
      value: 'clothes',
      label: 'Clothes',
    },
    {
      key: 4,
      value: 'transport',
      label: 'Transport',
    },
    {
      key: 5,
      value: 'entertainments',
      label: 'Entertainments',
    },
    {
      key: 6,
      value: 'transfers',
      label: 'Transfers',
    },
    {
      key: 7,
      value: 'gifts',
      label: 'Gifts/souvenirs',
    },
    {
      key: 8,
      value: 'others',
      label: 'Others',
    },
    {
      key: 8,
      value: 'health',
      label: 'Health',
    },
  ];

  const years = [2019, 2020, 2021, 2022, 2023];

  const getExpensesArray = async () => {
    try {
      await getDoc(doc(FIRESTORE_DB, `users/${user.uid}`)).then((doc) => {
        const expensesArray = doc.data()?.expensesArray;
        expensesStore.setExpensesArray(expensesArray);
        const month = months[new Date().getMonth()];
        const year = years.find((year) => year === new Date().getFullYear());
        expensesStore.setCurrentMonth(month);
        expensesStore.setCurrentYear(year);
        const newExpensesObj = expensesStore.expensesArray.find(
          (item) => item?.month === month && item.year === year,
        );
        expensesStore.setExpenses(newExpensesObj?.expense ? newExpensesObj?.expense : 0);
        expensesStore.setCategories(newExpensesObj?.categories ? newExpensesObj?.categories : {});
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      getExpensesArray();
    }
  }, [user]);

  useEffect(() => {
    if (expensesStore.currentMonth && expensesStore.currentYear) {
      const newExpensesObj = expensesStore.expensesArray.find(
        (item) =>
          item?.month === expensesStore.currentMonth && item.year === expensesStore.currentYear,
      );
      expensesStore.setExpenses(newExpensesObj?.expense ? newExpensesObj?.expense : 0);
      expensesStore.setCategories(newExpensesObj?.categories ? newExpensesObj?.categories : {});
    }
  }, [expensesStore.currentMonth, expensesStore.currentYear]);

  const onLogOut = () => {
    expensesStore.setExpenses(0);
    expensesStore.setExpensesArray([]);
    signOut(FIREBASE_AUTH);
    navigation.navigate('Auth');
  };

  const onAddExpense = async (number) => {
    if (!number) return;
    let isFound = false;
    let categories = {};
    const newExpensesArray = expensesStore.expensesArray?.map((item) => {
      if (item?.month === expensesStore.currentMonth && item.year === expensesStore.currentYear) {
        isFound = true;
        categories = {
          ...item.categories,
          [category]: (item.categories?.[category] ? item.categories?.[category] : 0) + +number,
        };
        return {
          ...item,
          expense: (item.expense ? item.expense : 0) + +number,
          categories: categories,
        };
      } else return item;
    });
    if (!isFound) {
      categories = {
        ...item.categories,
        [category]: (item.categories?.[category] ? item.categories?.[category] : 0) + +number,
      };
      newExpensesArray.push({
        expense: +number,
        year: expensesStore.currentYear,
        month: expensesStore.currentMonth,
        categories: categories,
      });
    }
    expensesStore.setCategories(categories);
    expensesStore.setExpensesArray(newExpensesArray);
    await updateDoc(doc(FIRESTORE_DB, `users/${user.uid}`), {
      expensesArray: newExpensesArray,
    });

    expensesStore.addExpenses(number);
    setCategory(null);
  };

  const onSubExpense = async (number) => {
    if (!number) return;
    let isFound = false;
    let categories = {};
    const newExpensesArray = expensesStore.expensesArray?.map((item) => {
      if (item?.month === expensesStore.currentMonth && item.year === expensesStore.currentYear) {
        isFound = true;
        const newCategoryValue =
          (item.categories?.[category] ? item.categories?.[category] : 0) - +number;
        categories = {
          ...item.categories,
          [category]: newCategoryValue > 0 ? newCategoryValue : 0,
        };
        const result = (item.expense ? item.expense : 0) - +number;
        return {
          ...item,
          expense: result < 0 ? 0 : result,
          categories: categories,
        };
      } else return item;
    });
    if (!isFound) {
      newExpensesArray.push({
        expense: 0,
        year: expensesStore.currentYear,
        month: expensesStore.currentMonth,
        categories: categories,
      });
    }
    expensesStore.setCategories(categories);
    expensesStore.setExpensesArray(newExpensesArray);
    await updateDoc(doc(FIRESTORE_DB, `users/${user.uid}`), {
      expensesArray: newExpensesArray,
    });

    expensesStore.subExpenses(number);
    setCategory(null);
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
      {loading ? (
        <ActivityIndicator size={50} style={{ marginTop: '70%' }} color={'#627057'} />
      ) : (
        <View>
          <View style={styles.expensesWrp}>
            <View style={styles.selectsWrp}>
              <SelectDropdown
                onSelect={(e) => expensesStore.setCurrentMonth(e)}
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
                defaultValue={expensesStore.currentMonth}
              />
              <SelectDropdown
                onSelect={(e) => expensesStore.setCurrentYear(e)}
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
                defaultValue={expensesStore.currentYear}
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
              icon={() => <MaterialCommunityIcons name='food-variant' size={24} color='#EAECDF' />}>
              Food {expensesStore.categories.food ? expensesStore.categories.food : 0} &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <FontAwesome name='medkit' size={24} color='#EAECDF' />}>
              Health {expensesStore.categories.health ? expensesStore.categories.health : 0} &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <Ionicons name='restaurant' size={24} color='#EAECDF' />}>
              Cafe/restaurants {expensesStore.categories.cafe ? expensesStore.categories.cafe : 0}{' '}
              &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <Ionicons name='shirt' size={24} color='#EAECDF' />}>
              Clothes {expensesStore.categories.clothes ? expensesStore.categories.clothes : 0}{' '}
              &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <FontAwesome name='bus' size={24} color='#EAECDF' />}>
              Transport{' '}
              {expensesStore.categories.transport ? expensesStore.categories.transport : 0} &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <FontAwesome5 name='bowling-ball' size={24} color='#EAECDF' />}>
              Entertainments{' '}
              {expensesStore.categories.entertainments
                ? expensesStore.categories.entertainments
                : 0}{' '}
              &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <AntDesign name='creditcard' size={24} color='#EAECDF' />}>
              Transfers{' '}
              {expensesStore.categories.transfers ? expensesStore.categories.transfers : 0} &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <AntDesign name='gift' size={24} color='#EAECDF' />}>
              Gifts/souvenirs {expensesStore.categories.gifts ? expensesStore.categories.gifts : 0}{' '}
              &#8381;
            </Chip>
            <Chip
              textStyle={styles.chipText}
              style={styles.chip}
              icon={() => <FontAwesome5 name='money-bill' size={24} color='#EAECDF' />}>
              Others {expensesStore.categories.others ? expensesStore.categories.others : 0} &#8381;
            </Chip>
          </View>
        </View>
      )}
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
              <SelectDropdown
                defaultButtonText={'Select category'}
                onSelect={(e) => {
                  setCategory(e.value);
                }}
                showsVerticalScrollIndicator={false}
                rowTextStyle={{
                  color: '#627057',
                }}
                buttonTextStyle={{
                  color: '#627057',
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: '#627057',
                  borderRadius: 100,
                  width: '80%',
                }}
                buttonTextAfterSelection={(item) => {
                  return item.label;
                }}
                rowTextForSelection={(item) => {
                  return item.label;
                }}
                dropdownStyle={{
                  borderWidth: 3,
                  borderColor: '#627057',
                  borderRadius: 10,
                }}
                data={categories.map((category) => {
                  return {
                    key: category.key,
                    label: category.label,
                    value: category.value,
                  };
                })}
              />
              <CustomInput
                name={'addNumber'}
                inputMode={'numeric'}
                control={control}
                placeholder={'0'}
              />
              <CustomButton
                disabled={!category}
                text={'Add'}
                onPress={() => {
                  handleSubmit(onAddExpense(addNumber));
                  setAddModalVisible(false);
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
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
            <View style={styles.modalView}>
              <Pressable style={styles.closeButton} onPress={() => setSubModalVisible(false)}>
                <AntDesign name='close' size={40} color='#627057' />
              </Pressable>
              <SelectDropdown
                defaultButtonText={'Select category'}
                onSelect={(e) => {
                  setCategory(e.value);
                }}
                showsVerticalScrollIndicator={false}
                rowTextStyle={{
                  color: '#627057',
                }}
                buttonTextStyle={{
                  color: '#627057',
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: '#627057',
                  borderRadius: 100,
                  width: '80%',
                }}
                buttonTextAfterSelection={(item) => {
                  return item.label;
                }}
                rowTextForSelection={(item) => {
                  return item.label;
                }}
                dropdownStyle={{
                  borderWidth: 3,
                  borderColor: '#627057',
                  borderRadius: 10,
                }}
                data={categories}
              />
              <CustomInput
                inputMode={'numeric'}
                name={'subNumber'}
                control={control}
                placeholder={'0'}
              />
              <CustomButton
                disabled={!category}
                text={'Subtract'}
                onPress={() => {
                  handleSubmit(onSubExpense(subNumber));
                  setSubModalVisible(false);
                }}
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
