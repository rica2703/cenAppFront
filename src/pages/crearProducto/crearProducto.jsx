import React, { useState } from 'react';
import Header from '../../componentes/pages/header/header';
import { useNavigate } from 'react-router';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones';
import Input from '../../componentes/ui/input/input';
import Boton from '../../componentes/ui/boton/boton';
import './crearProducto.css';
import { useEffect } from 'react';
import MensajeAlerta from '../../componentes/pages/alerta/mensajeAlerta';
function CrearProducto() {
  const navigate = useNavigate();
  const [opcionesMenu, setOpcionesMenu] = useState(false);
  const [textosData, setTextosData] = useState(["Historial de venta", "Aceptar pedidos","Crear cuenta","cerrar sesion","Crear producto"]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [imagenProducto, setImagenProducto] = useState("");
  const [estadoProducto, setEstadoProducto] = useState("");
  const [token, setToken] = useState("");
  const [mensajeAlerta,setMensaje]=useState("");
  const [mostrarMensaje,setMostrarMensaje]=useState(false);

  const handlerClickAdios = () => {
    setOpcionesMenu(false);
  }
  const cerrarSesion=()=>{
    localStorage.setItem('token',null);
    // localStorage.setItem('token', token);
    navigate("/");
  }
  const handlerClickUno = () => {
    navigate("/historial-Ventas");
  }

  const handlerClickDos = () => {
    navigate("/aceptar-pedidos");
  }
  const handlerClickCrearCuenta=()=>{
    navigate("/crearcuenta");
  }
  useEffect(() => {
    // Obtener el token del localStorage al cargar el componente
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, []); // Se ejecuta solo una vez al montar el componente
    // Token de inicio de sesión
    const handlerClickEnviar = () => {
        // Validar campos
        if (!nombreProducto || !precioProducto || !imagenProducto || !estadoProducto) {
            // alert("Por favor completa todos los campos.");
            setMensaje("Por favor complete todos los campos");
          setMostrarMensaje(true);
            return;
        }
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTc4Yzg3ZDhiOTZhYWE5OWUyMzRmMiIsImlhdCI6MTcxMzEzNTU3OSwiZXhwIjoxNzEzMjIxOTc5fQ.9-lPCNWZCQjfszYSl6-bHxTAno2IF1dBtMjlQxIEVkM'; // Reemplaza 'tu_token_aqui' por tu token real

      
    // Crear el objeto de configuración para la solicitud fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'x-access-token': `Bearer ${token}`
        'x-access-token': token // Agregar el token en el encabezado Authorization
      },
      body: JSON.stringify({
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto,
        estado: estadoProducto
      })
    };

    // Realizar la solicitud POST al backend
    // fetch(`http://44.221.145.222/api/auth/crearproducto`, requestOptions)
    
    fetch('http://localhost:8080/api/auth/crearproducto', requestOptions)
    .then(response => {
      if (response.ok) {
          // alert("funciona hasta aqui");
          return response.json();
        } else {
          setMensaje("Error al crear el producto");
          setMostrarMensaje(true);
          throw new Error('Error al crear el producto.');
        }
      })
      .then(data => {
        console.log('Producto creado exitosamente:', data);
        setMensaje("Producto creado exitosamente");
        setMostrarMensaje(true);
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
        <Input value={imagenProducto} onChange={(e) => setImagenProducto(e.target.value)} placeholder="Imagen" type="text" />
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
      {mostrarMensaje&&(<MensajeAlerta onClickBoton={()=>setMostrarMensaje(false)} textoBotonAlerta="ok" textoAlerta={mensajeAlerta}/>)}
    </>
  );
};

export default CrearProducto;
