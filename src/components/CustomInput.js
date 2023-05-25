import React, { Component, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({
  inputMode = 'none',
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  const [number, setNumber] = useState('');
  const handleChange = (event) => {
    const toNumber = Number(event.split(/\s+/).join(''));
    const toLocale = toNumber.toLocaleString('ru-RU');
    setNumber(toLocale);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <TextInput
              inputMode={inputMode}
              placeholderTextColor={'#627057'}
              defaultValue=''
              value={inputMode === 'numeric' ? number : undefined}
              onChangeText={
                inputMode === 'numeric'
                  ? (e) => {
                      handleChange(e);
                    }
                  : onChange
              }
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, { borderColor: error ? 'red' : '#627057' }]}
              secureTextEntry={secureTextEntry}
            />
            {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message}</Text>}
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { width: '70%' },
  input: {
    color: '#627057',
    fontSize: 22,
    backgroundColor: 'white',
    borderColor: '#627057',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
});

export default CustomInput;
