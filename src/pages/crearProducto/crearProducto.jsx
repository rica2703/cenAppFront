import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../componentes/pages/header/header';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones';
import Input from '../../componentes/ui/input/input';
import Boton from '../../componentes/ui/boton/boton';
import './crearProducto.css';
import imagen1 from '../../assets/asada.png'; // Importa tus imágenes predefinidas
import imagen2 from '../../assets/chorizo.png';
import imagen3 from '../../assets/carnitas.png';
import MensajeAlerta from '../../componentes/pages/alerta/mensajeAlerta.jsx';
import { useEffect } from 'react';
function CrearProducto() {
  const navigate = useNavigate();
  const [opcionesMenu, setOpcionesMenu] = useState(false);
  const [textosData, setTextosData] = useState(["Historial de venta", "Aceptar pedidos","Crear cuenta","Cerrar sesión","Crear producto"]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [imagenProducto, setImagenProducto] = useState(""); // Almacena el nombre de la imagen seleccionada
  const [estadoProducto, setEstadoProducto] = useState("");
  const [token, setToken] = useState("");
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [imagenSeleccionada,setImagenSeleccionada]=useState(null);
  useEffect(() => {
    const tokenFromStorage=localStorage.getItem('token');
    setToken(tokenFromStorage);
    },[]);
  const handlerClickAdios = () => {
    setOpcionesMenu(false);
  }

  const cerrarSesion = () => {
    localStorage.setItem('token', null);
    navigate("/");
  }

  const handlerClickUno = () => {
    navigate("/historial-Ventas");
  }

  const handlerClickDos = () => {
    navigate("/aceptar-pedidos");
  }

  const handlerClickCrearCuenta = () => {
    navigate("/crearcuenta");
  }

  const handlerClickEnviar = () => {
    if (!nombreProducto || !precioProducto || !imagenSeleccionada || !estadoProducto) {
      setMensajeAlerta("Por favor complete todos los campos");
      setMostrarMensaje(true);
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenSeleccionada, // Envia el nombre de la imagen seleccionada
        estado: estadoProducto
      })
    };

    fetch('http://localhost:8080/api/auth/crearproducto', requestOptions)
      .then(response => {
        if (response.ok) {
          setMensajeAlerta("Producto creado exitosamente");
          setMostrarMensaje(true);
          setNombreProducto("");
        setPrecioProducto("");
        setEstadoProducto("");
        setImagenProducto("");
          return response.json();
        } else {
          setMensajeAlerta("Error al crear el producto");
          setMostrarMensaje(true);
          throw new Error('Error al crear el producto.');
        }
      })
      .then(data => {
        console.log('Producto creado exitosamente:', data);
        setNombreProducto("");
        setPrecioProducto("");
        setEstadoProducto("");
        // setImagenProducto("");
        setImagenSeleccionada(null);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Header onClick={() => setOpcionesMenu(true)} />
      {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={(index) => index === 0 ? handlerClickUno() : (index === 1 ? handlerClickDos() :(index===2?handlerClickCrearCuenta():(index===3?cerrarSesion() :handlerClickAdios())) )} onClickBoton={() => setOpcionesMenu(false)} />)}
      <section className='seccionCrearProducto'>
        <Input value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} placeholder="Nombre del producto" type="text" />
        <Input value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} placeholder="Precio" type="number" />
          <p>Elige la imagen para el producto</p>
        <div className='imagenesPredefinidas'>
          <img src={imagen1} alt="Imagen 1" onClick={() => setImagenSeleccionada("asada")} className={imagenSeleccionada === "asada" ? "imagenSeleccionada" : ""} />
          <img src={imagen2} alt="Imagen 2" onClick={() => setImagenSeleccionada("chorizo")} className={imagenSeleccionada === "chorizo" ? "imagenSeleccionada" : ""} />
          <img src={imagen3} alt="Imagen 3" onClick={() => setImagenSeleccionada("carnitas")} className={imagenSeleccionada === "carnitas" ? "imagenSeleccionada" : ""} />
        </div>
        <div className='checkboxDiv'>
          <div className='checkboxDiv'>
            <p>Activo</p>
            <input type="checkbox" name="estado" value="activo" checked={estadoProducto === "activo"} onChange={(e) => setEstadoProducto(e.target.checked ? "activo" : "inactivo")} />
          </div>
          <div className='checkboxDiv'>
            <p>Inactivo</p>
            <input type="checkbox" name="estado" value="inactivo" checked={estadoProducto === "inactivo"} onChange={(e) => setEstadoProducto(e.target.checked ? "inactivo" : "activo")} />
          </div>
        </div>
        <Boton onClick={handlerClickEnviar} textoBoton="Crear Producto" className="botonEnviarProducto" />
      </section>
      {mostrarMensaje && (<MensajeAlerta onClickBoton={() => setMostrarMensaje(false)} textoBotonAlerta="ok" textoAlerta={mensajeAlerta} />)}
    </>
  );
};

export default CrearProducto;
