import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter } from "react-router-dom"
import { RoutesForTheApp } from './router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Layout } from './components/layout';
import { Toaster } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyC6AtVb7hPaEwpTfs0Grf65Ef4Tg2w4ELc",
  authDomain: "quizy-b1cbf.firebaseapp.com",
  projectId: "quizy-b1cbf",
  storageBucket: "quizy-b1cbf.appspot.com",
  messagingSenderId: "860334105935",
  appId: "1:860334105935:web:8cb5ba8c38f1d536e7513a",
  measurementId: "G-ZC12RYP1FW"
};
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ParallaxProvider>
    <BrowserRouter>
      <Layout>
        <RoutesForTheApp />
        <Toaster />
      </Layout>
    </BrowserRouter>
  </ParallaxProvider>

);
reportWebVitals();
