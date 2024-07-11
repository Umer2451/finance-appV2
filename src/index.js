import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './features/login/login';
import Signup from './features/login/signup';
import Home from './features/home/home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
  },
  {
    path: "/signup",
    element: <Signup />, 
  },
  {
    path: "/home",
    element: <Home />, 
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
