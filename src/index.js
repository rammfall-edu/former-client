import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import Application from './Application';
import store from './store';

createRoot(document.querySelector('.root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
