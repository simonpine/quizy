import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebasecom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc  } from 'firebase/firestore';
import { db } from '../firebasecom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAuth, loading] = useAuthState(auth);
  const [user, setUser] = useState(null);

  const [apiLoading, setApiLoading] = useState(false);

  const isthere = !userAuth && !loading
  useEffect(() => {
    if (!!userAuth) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then(res => {
          if (!res.exists()) {
            const example = {
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,
              apikey: "",
              imageUrl: auth.currentUser.photoURL
            }
            setDoc(doc(db, "users", auth.currentUser.uid), example);
            setUser(example)
          }
          else{
            setUser(res.data())
          }
        })
        .catch((e) => console.error(e));
    }
    else {
      setUser(null)
    }
    // const docRef = doc(db, "users", auth.currentUser.uid);
    // const docSnap = await getDoc(docRef);
    // setUser(auth.currentUser)
    // console.log(userAuth)
  }, [userAuth])

  function logout() {
    auth.signOut()
  }
  return (
    <UserContext.Provider value={{ user, isthere, logout, apiLoading }}>
      {children}
    </UserContext.Provider>
  );
};
