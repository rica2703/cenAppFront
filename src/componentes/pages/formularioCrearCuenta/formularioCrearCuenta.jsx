import Logo from '../../../assets/logo.png';
import Link from "../../ui/link/link";
import Boton from "../../ui/boton/boton";
import Input from "../../ui/input/input";
import Titulo from "../../ui/titulo/titulo";
import MensajeAlertaComponente from '../alerta/mensajeAlerta';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
function FormCrearCuenta() {
    const [token, setToken] = useState("");
    const [nombre, setNombre] = useState("");
    // const [apellidos, setApellidos] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [rol, setRol] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [MensajeAlerta, setMensajeAlerta] = useState("");
    const handlerClick = () => {
        navigate("/crear-producto");
    }
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);
    }, []);
    const HandlerClickCrearCuenta = () => {
        if (!nombre || !apellidos || !nombreUsuario || !rol || !correo || !contraseña) {
            setMensajeAlerta("Complete todos los campos");
            setMostrarAlerta(true);
            return;
        }
        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                username:nombreUsuario,
                email: correo,
                password: contraseña,
                roles:["admin"],
                nombre: nombre,
                // Apellidos: apellidos
            })
        };
        fetch('http://localhost:8080/api/auth/signup',requestOption)
        .then(response=>{
            if(response.ok){
                setMensajeAlerta("Cuenta creada con exito");
                setMostrarAlerta(true);
                return response.json();
            }else if(response.status===400){
                setMensajeAlerta("Nombre de usuario o correo en uso");
                setMostrarAlerta(true);
                throw new Error("Nombre de usuario o correo en uso");
            }
            else{
                setMensajeAlerta("Error al crear el usuario");
                setMostrarAlerta(true);
                throw new Error('Error al crear el usuario');
            }
        })
        .then(data=>{
            setMensajeAlerta("Cuenta creada con exito");
            setMostrarAlerta(true);
            navigate("/");
        })
        .catch(error=>{
            if(response.status===400){
                setMensajeAlerta("Nombre de usuario o correo en uso");
                setMostrarAlerta(true);
                throw new Error("Nombre de usuario o correo en uso");
            }
            else{

                setMensajeAlerta("Error al crear el usuario: ");
                setMostrarAlerta(true);
            }
        });
    }
    return (
        <>
            <div className="formulario">
                <img src={Logo} alt="" className="Logo" />
                <Titulo textoH1="CenApp" className="titulo" />
                <Input onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" type="text" />
                {/* <Input onChange={(e) => setApellidos(e.target.value)} placeholder="Apellidos" type="text" /> */}
                <Input onChange={(e) => setNombreUsuario(e.target.value)} placeholder="Nombre de usuario" type="text" />
                <Input onChange={(e) => setRol(e.target.value)} placeholder="Rol" />
                <Input onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
                <Input onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña" type="password" />
                <Boton onClick={() => HandlerClickCrearCuenta()} textoBoton="Crear cuenta" />
                <Link onClick={() => handlerClick()} textoA="Regresar al menu" />
            </div>
            {mostrarAlerta&&(<MensajeAlertaComponente onClickBoton={()=>setMostrarAlerta(false)} textoAlerta={MensajeAlerta} textoBotonAlerta="ok"/>)}
        </>
    );
}
export default FormCrearCuenta;