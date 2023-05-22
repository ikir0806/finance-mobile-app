import React, { Component } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '70%',
  },
  container_TERTIARY: {},
  container_PRIMARY: {
    backgroundColor: '#627057',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  container_SECONDARY: {
    borderColor: '#627057',
    borderWidth: 1,
    borderRadius: 10,
  },
  text_TERTIARY: {
    fontSize: 16,
    color: '#627057',
  },
  text_PRIMARY: {
    color: '#EAECDF',
    marginVertical: 5,
    fontSize: 18,
  },
  text_SECONDARY: {
    color: '#627057',
    marginVertical: 5,
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default CustomButton;
