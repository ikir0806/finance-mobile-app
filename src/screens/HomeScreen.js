import React from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrp}>
        <Text style={styles.header}> Welcome back </Text>
        <Image
          resizeMode='contain'
          source={require('../../assets/images/rich-boy.gif')}
          style={[styles.image, { height: height * 0.3, maxWidth: 400 }]}
        />
      </View>
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
});

export default HomeScreen;
