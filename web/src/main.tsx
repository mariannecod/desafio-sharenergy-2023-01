import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Erros from "./rotas/erros/error404.tsx";

import Login from './pages/Login';
import Home from './pages/Home';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Erros />,
  },
  {
        path: "/home",
        element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
