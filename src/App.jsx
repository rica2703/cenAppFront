import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/login/login';
import CrearCuenta from './pages/CrearCuenta/crearCuenta';
import Menu from './pages/menu/menu.jsx';
import MiCuenta from './pages/miCuenta/miCuenta.jsx';
import AceptarPedidos from './pages/AceptarPedidos/AceptarPedidos.jsx';
import HistorialVentas from './pages/HistorialVentas/historialVentas.jsx';
import CrearProducto from './pages/crearProducto/crearProducto.jsx';
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
    {
      path:"/mi-cuenta",
      element:<MiCuenta/>,
    },
    {
      path:"/aceptar-pedidos",
      element:<AceptarPedidos/>,
    },
    {
      path:"/historial-Ventas",
      element:<HistorialVentas/>
    },
    {
      path:"/crear-producto",
      element:<CrearProducto/>
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
