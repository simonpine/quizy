import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebasecom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebasecom';
import toast, { Toaster } from 'react-hot-toast';

export const UserContext = createContext();

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
            setDoc(doc(db, "users", auth.currentUser.uid), example);
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
    // const docRef = doc(db, "users", auth.currentUser.uid);
    // const docSnap = await getDoc(docRef);
    // setUser(auth.currentUser)
    // console.log(userAuth)
  }, [userAuth])


  async function apiSave(e) {
    e.preventDefault()
    setApiLoading(true)
    console.log(isValidOpenAIKeyFormat(e.target.ApiKeyInput.value))
    if (!isValidOpenAIKeyFormat(e.target.ApiKeyInput.value)) {
      toast.error('The API Key is not valid.', {
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
          primary: '#ff755d',
        },
      })
      setApiLoading(false)
      return 
    }

    const result = {
      ...user,
      apikey: e.target.ApiKeyInput.value
    }
    await setDoc(doc(db, "users", auth.currentUser.uid), result).then(()=>{
      toast.success('API key saved.', {
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
          primary: '#ff755d',
        },
      })
      setUser(result)

    }).catch(()=>{
      toast.error('Something went wrog, try again.', {
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
          primary: '#ff755d',
        },
      })
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
      <Toaster />
    </UserContext.Provider>
  );
};
