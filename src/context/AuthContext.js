import { onAuthStateChanged } from 'firebase/auth/react-native';
import { createContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setInitialized(true);
    });
  });

  const value = { user, initialized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
