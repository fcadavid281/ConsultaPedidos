import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PedidosApp } from './PedidosApp';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <PedidosApp />
    </BrowserRouter>
  </React.StrictMode>
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// serviceWorker.unregister();