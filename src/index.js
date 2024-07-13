import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Signup from './features/login/signup';
import Home from './features/home/home';
import LogintoApp from './features/login/loginapp';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImageShow from './features/home/components/imageupload';
const container = document.getElementById('root')
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/finance-app",
    element: <LogintoApp />, 
  },
  {
    path: "/signup",
    element: <Signup />, 
  },
  {
    path: "/home",
    element: <Home />, 
  },
  {
    path: "/profile",
    element: <ImageShow/>
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
