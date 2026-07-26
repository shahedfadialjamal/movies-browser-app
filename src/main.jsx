import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';
import './App.css';

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
