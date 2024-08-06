import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebasecom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebasecom';
import toast from 'react-hot-toast';

export const UserContext = createContext();

const ToastStyle = {
  position: "bottom-center",
  style: {
      background: 'rgb(255, 255, 255, .9)',
      color: '#2F0C29',
      borderRadius: '8px',
      fontSize: '1.3rem',
      fontWeight: '600'
  },
  iconTheme: {
      secondary: '#2F0C29',
      // primary: '#ff755d',
  },
}

export const UserProvider = ({ children }) => {
  const [userAuth, loading] = useAuthState(auth);
  const [user, setUser] = useState(null);

  const [apiLoading, setApiLoading] = useState(false);

  function isValidOpenAIKeyFormat(apiKey) {
    const apiKeyPattern = /^sk-[A-Za-z0-9]/;
    return apiKeyPattern.test(apiKey);
  }

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
            setDoc(docRef, example);
            setUser(example)
          }
          else {
            setUser(res.data())
          }
        })
        .catch((e) => console.error(e));
    }
    else {
      setUser(null)
    }
  }, [userAuth])


  async function apiSave(e) {
    e.preventDefault()
    setApiLoading(true)
    if (!isValidOpenAIKeyFormat(e.target.ApiKeyInput.value) & e.target.ApiKeyInput.value !== '') {
      toast.error('The API Key is not valid.', ToastStyle)
      setApiLoading(false)
      return 
    }

    const result = {
      ...user,
      apikey: e.target.ApiKeyInput.value
    }
    await setDoc(doc(db, "users", auth.currentUser.uid), result).then(()=>{
      toast.success('API key saved.', ToastStyle)
      setUser(result)

    }).catch(()=>{
      toast.error('Something went wrog, try again.', ToastStyle)
      setUser(result)
    })

    setApiLoading(false)
  }

  function logout() {
    auth.signOut()
  }
  return (
    <UserContext.Provider value={{ user, isthere, logout, apiLoading, apiSave }}>
      {children}
    </UserContext.Provider>
  );
};
