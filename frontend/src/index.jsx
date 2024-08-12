import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-tooltip/dist/react-tooltip.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { MainContextProvider } from './MainContext/MainContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <MainContextProvider>
            <GoogleOAuthProvider clientId="675676213820-fl9v75h52tb9hr6o8bppv8im87hnq5il.apps.googleusercontent.com">
            <App />     
            </GoogleOAuthProvider>
        </MainContextProvider>
    </Router>
);
