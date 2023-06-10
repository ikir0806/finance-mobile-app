import React from 'react';
import { Text, View, StyleSheet, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import CustomButton from './CustomButton';

const CustomModal = ({ text, modalVisible, setModalVisible }) => {
  return (
    <Modal visible={modalVisible} transparent>
      <KeyboardAvoidingView
        style={{ height: '100%' }}
        enabled
        behavior={Platform.OS === 'android' ? undefined : 'position'}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <CustomButton text={'Ok'} onPress={() => setModalVisible(false)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CustomModal;
