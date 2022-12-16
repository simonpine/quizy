import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {RouterProvider} from "react-router-dom"
import { router } from './router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6AtVb7hPaEwpTfs0Grf65Ef4Tg2w4ELc",
  authDomain: "quizy-b1cbf.firebaseapp.com",
  projectId: "quizy-b1cbf",
  storageBucket: "quizy-b1cbf.appspot.com",
  messagingSenderId: "860334105935",
  appId: "1:860334105935:web:8cb5ba8c38f1d536e7513a",
  measurementId: "G-ZC12RYP1FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
