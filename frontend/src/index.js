import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Users } from './pages/Users';
import { Groups } from './pages/Groups'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <ReactNotification />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/users" element={<Users />} />
      <Route path="/groups" element={<Groups />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
