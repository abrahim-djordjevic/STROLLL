import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routines from './pages/Routines';
import Sessions from './pages/Sessions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Routines />} />
          <Route path='sessions' element={<Sessions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);