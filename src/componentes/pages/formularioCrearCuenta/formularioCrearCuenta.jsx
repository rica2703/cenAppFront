import Logo from '../../../assets/logo.png';
import Link from "../../ui/link/link";
import Boton from "../../ui/boton/boton";
import Input from "../../ui/input/input";
import Titulo from "../../ui/titulo/titulo";
import { useNavigate } from 'react-router';
function FormCrearCuenta(){
    const navigate=useNavigate();
    const handlerClick=()=>{
        navigate("/");
    }
    return(
        <>
         <form action="" className="formulario">
                <img src={Logo} alt="" className="Logo" />
                <Titulo textoH1="CenApp" className="titulo"/>
                <Input placeholder="Nombre" type="text"/>
                <Input placeholder="Apellidos" type="text"/>
                <Input placeholder="Nombre de usuario" type="text" />
                <Input placeholder="Rol"/>
                <Input placeholder="Correo"/>
                <Input placeholder="Contraseña" type="password"/>
                <Boton  textoBoton="Crear cuenta"/>
                <Link onClick={()=>handlerClick()} textoA="Ya tengo una Cuenta"/>
            </form>
        </>
    );
}
export default FormCrearCuenta;