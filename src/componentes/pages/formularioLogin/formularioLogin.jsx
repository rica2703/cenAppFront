import Link from "../../ui/link/link";
import Titulo from "../../ui/titulo/titulo";
import Input from "../../ui/input/input";
import Boton from "../../ui/boton/boton";
import Logo from '../../../assets/logo.png';
import '../../../pages/login/login.css';
import { useNavigate } from "react-router";
import { useState } from "react";
import MensajeAlerta from "../alerta/mensajeAlerta";
// 44.221.145.222 ip elastica
function FormLogin() {
const navigate=useNavigate();
const [usuario,setUsuario]=useState("");
const [contraseña,setContraseña]=useState(""); 
const [mostrarMensaje,setMostrarMensaje]=useState(false);
const [Mensaje,setMensaje]=useState("");
    const handlerClick=()=>{
        navigate("/crearCuenta");
    }
    const handlerClickIniciarSesion=()=>{
        if(!usuario||!contraseña){
            setMensaje("Completa todos los campos");
            setMostrarMensaje(true);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'x-access-token': `Bearer ${token}`
            //   'x-access-token': token // Agregar el token en el encabezado Authorization
            },
            body: JSON.stringify({
              username:usuario,
              password:contraseña,
            })
          };
          fetch('http://lcocalhost:8080/api/auth/signin', requestOptions)
    .then(response => {
      if (response.ok) {
        //   alert("funciona hasta aqui");
        // throw("inicio de sesion con exito");
          return response.json();
        } else  if(response.status===401){
            setMensaje("Usuario o contraseña invalida");
            setMostrarMensaje(true);
          throw new Error('Usuario o contraseña invalida');
        }
        else if(response.status===404){
            setMensaje("Usuario Inexistente o contraseña incorrecta");
            setMostrarMensaje(true);
            throw new Error('Usuario inexistente o contraseña incorrecta');
        }
      })
      .then(data => {
        // alert("entro")
        console.log('Inicio de sesion exitoso', data);
        const token = data.accessToken;
        localStorage.setItem('token', token);
        navigate("/crear-producto");
      })
      .catch(error => {
        setMensaje("Usuario Inexistente o contraseña incorrecta");
        setMostrarMensaje(true);
        console.error('Error:', error);
      })
      
  
    }
    return (
        <>
            <div action="" className="formulario">
                <img src={Logo} alt="" className="Logo" />
                <Titulo textoH1="CenApp" className="titulo"/>
                <Input placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} type="text"/>
                <Input placeholder="Contraseña" onChange={(e)=>setContraseña(e.target.value)} type="password"/>
                <Boton onClick={()=>handlerClickIniciarSesion()} textoBoton="Iniciar sesión"/>
                {/* <Link onClick={()=>handlerClick()} textoA="Crear Cuenta"/> */}
            </div>
            {mostrarMensaje&&(<MensajeAlerta onClickBoton={()=>setMostrarMensaje(false)} textoBotonAlerta="OK" textoAlerta={Mensaje}/>)}
        </>
    );
}
export default FormLogin;