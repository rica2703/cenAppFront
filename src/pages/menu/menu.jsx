import React, { useState, useEffect } from 'react';
import Header from '../../componentes/pages/header/header';
import CardProducto from '../../componentes/pages/cardProducto/cardProducto';
import './menu.css';
import asada from '../../assets/asada.png';
import chorizo from '../../assets/chorizo.png';
import carnitas from '../../assets/carnitas.png';
import Alerta from '../../componentes/pages/alerta/alerta.jsx';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones.jsx';
import { useNavigate } from 'react-router';

function Menu() {
  const navigate = useNavigate();
  const [pedir, setPedir] = useState(false);
  const [opcionesMenu, setOpcionesMenu] = useState(false);
  const [textosData, setTextosData] = useState(["Mi Cuenta"]);
  const [token, setToken] = useState("");
  const [datos, setDatos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({});
  const [cantidad, setCantidad] = useState("");

  const handlerClickMiCuenta = () => { navigate('/mi-cuenta') }

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);

    fetch('http://localhost:8080/api/auth/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': tokenFromStorage,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos.');
        }
      })
      .then(data => {
        console.log('Datos obtenidos:', data);
        setDatos(data.filter(producto => producto.estado === 'activo'));
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, [token]);

  const handlerClick = (imagen, nombre, precio) => {
    setPedir(true);
    setNuevoPedido({
      imagen: imagen,
      precio: precio,
      cantidad: cantidad,
      nombre: nombre,
    });
  }

  const ordenar = () => {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(nuevoPedido);
    // alert("fallo")
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    // Obtenemos el subtotal del nuevo pedido
    const subtotal = cantidad * nuevoPedido.precio;
    
    // Obtenemos el total actual del localStorage
    let total = parseInt(localStorage.getItem('localTotal'), 10) || 0;
    
    // Sumamos el subtotal al total actual
    total += subtotal;
    
    // Actualizamos el total en el localStorage
    localStorage.setItem('localTotal', total.toString());

    setPedir(false);
  }

  return (
    <>
      <Header onClick={() => setOpcionesMenu(true)} />
      {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={() => handlerClickMiCuenta()} onClickBoton={() => setOpcionesMenu(false)} />)}
      {datos.map((data, key) => (
        <CardProducto
          key={key}
          onClick={() => handlerClick(data.imagen, data.nombre, data.precio)}
          imagenAlimento={(() => {
            if (data.imagen === 'asada') return asada;
            else if (data.imagen === 'chorizo') return chorizo;
            else if (data.imagen === 'carnitas') return carnitas;
          })()}
          nombreAlimento={data.nombre}
          precioAlimento={data.precio}
        />
      ))}
      {pedir && (<Alerta onChange={(e) => setCantidad(e.target.value)} textoBotonAlerta="agregar" textoAlerta="Ingresa la cantidad" onClickBoton={() => ordenar()} />)}
    </>
  );
}

export default Menu;
