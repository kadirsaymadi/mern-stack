// genel tanımlamalar
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { API_URL } from './helper/config';
// reduxu dahil et
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// middleware'ları dahil et
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// tarayıcı eklentisinde kullanılacak devtools'u sayfaya dahil et
import { composeWithDevTools } from "redux-devtools-extension";
// root reduceri sayfaya dahil et
import rootReducer from "./reducers/rootReducer";
// componentleri sayfaya dahil et

import persistState from "redux-localstorage";
import App from './App';

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: API_URL,
  responseType: 'json'
});

// storu oluştur
const store = createStore(
  rootReducer, // store'a reduceleri ekle
  composeWithDevTools( // storun tarayıcı eklentisinde görünmesi için devtoolsu çalıştır
    applyMiddleware(
      promise, thunk, axiosMiddleware(client)
    ), // ara yazılımlar
    persistState()
  )
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <App />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

