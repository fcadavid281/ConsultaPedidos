import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PedidosApp } from './PedidosApp';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <HashRouter >
      <PedidosApp />
    </HashRouter>
  </React.StrictMode>
);
