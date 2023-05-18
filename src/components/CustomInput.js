import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, value, setValue, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '70%' },
  input: {
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
