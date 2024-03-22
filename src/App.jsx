import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/login/login';
import CrearCuenta from './pages/CrearCuenta/crearCuenta';
import Menu from './pages/menu/menu';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
   const router = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
    {
      path:"/crearCuenta",
      element:<CrearCuenta/>,
    },
    {
      path:"/ordenar",
      element:<Menu/>,
    },
    ])
function App() {

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
