import React, { createContext, useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth'; 
import app from './firebase'; 

interface IAuthContext {
    loginUser: (email: string, password: string) => Promise<void>; 
  createUser: (email: string, password: string) => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authError, setAuthError] = useState<string | null>(null);

  const createUser = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAuthError(null);
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const loginUser = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError(null);
    } catch (error) {
        handleAuthError(error as AuthError);
      }
    };
  
  const handleAuthError = (error: AuthError) => {
    let errorMessage = 'An error occurred';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Weak password';
    } else {
      errorMessage = error.message;
    }
    setAuthError(errorMessage);
  };

  const value: IAuthContext = {
    createUser,
    loginUser,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
