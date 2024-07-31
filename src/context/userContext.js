import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebasecom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAuth, loading] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const isthere = !userAuth && !loading
  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])
  return (
    <UserContext.Provider value={{ user, isthere }}>
      {children}
    </UserContext.Provider>
  );
};
