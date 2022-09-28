import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'

const Loader = () => {
    return (
        <>
            <h1>Loading ...</h1>
        </>
    )   
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);


