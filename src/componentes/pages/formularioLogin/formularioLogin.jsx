import Link from "../../ui/link/link";
import Titulo from "../../ui/titulo/titulo";
import Input from "../../ui/input/input";
import Boton from "../../ui/boton/boton";
import Logo from '../../../assets/logo.png';
import '../../../pages/login/login.css';
import { useNavigate } from "react-router";
function FormLogin() {
const navigate=useNavigate();
    const handlerClick=()=>{
        navigate("/crearCuenta");
    }
    return (
        <>
            <form action="" className="formulario">
                <img src={Logo} alt="" className="Logo" />
                <Titulo textoH1="CenApp" className="titulo"/>
                <Input placeholder="Usuario" type="text"/>
                <Input placeholder="Contraseña" type="password"/>
                <Boton  textoBoton="Iniciar sesión"/>
                <Link onClick={()=>handlerClick()} textoA="Crear Cuenta"/>
            </form>
        </>
    );
}
export default FormLogin;