import React from 'react';

import AuthProvider from '../context/AuthContext';
import InitialLayout from './InitialLayout';

const HomeScreen = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default HomeScreen;
