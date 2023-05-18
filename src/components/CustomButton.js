import React, { Component } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  container_TERTIARY: {},
  text: {
    textAlign: 'center',
    width: '70%',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#627057',
    marginTop: 5,
    borderColor: '#627057',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
});

export default CustomButton;
