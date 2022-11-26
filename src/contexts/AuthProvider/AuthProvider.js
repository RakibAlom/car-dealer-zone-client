import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext()

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const createUserRegister = (email, password) => {
    setLoading(true)
    console.log(email, password)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  const logOut = () => {
    localStorage.removeItem('access-token')
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])

  const authInfo = { user, setUser, loading, setLoading, createUserRegister, updateUser, signIn, logOut }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;