import React, { useState } from 'react';
import Header from '../../componentes/pages/header/header';
import CardProducto from '../../componentes/pages/cardProducto/cardProducto';
import './menu.css';
import ejemplo from '../../assets/esp32.jpg';
import datos from './menu.js';
import Alerta from '../../componentes/pages/alerta/alerta.jsx';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones.jsx';
import { useNavigate } from 'react-router';
import Boton from '../../componentes/ui/boton/boton.jsx';
function Menu (){
  const navigate=useNavigate();
  const[pedir,setPedir]=useState(false);
  const [opcionesMenu,setOpcionesMenu]=useState(false);
  const [textosData, setTextosData] = useState(["Mi Cuenta"]);
  const handlerClick=(imagen,nombre,precio)=>{
    setPedir(true);
  }
  const handlerClickMiCuenta=()=>{navigate('/mi-cuenta')}
  return (
    <>
    <Header onClick={()=>setOpcionesMenu(true)}/>
    {opcionesMenu&&(<MenuOpciones textosData={textosData} onClickBotonMap={()=>handlerClickMiCuenta()} onClickBoton={()=>setOpcionesMenu(false)}/>)}
    {datos.map((data,key)=>(<CardProducto onClick={()=>handlerClick(data.imagen,data.nombre,data.precio)} imagenAlimento={data.imagen} nombreAlimento={data.nombre} precioAlimento={data.precio}/>))}
    {pedir&&(<Alerta onClickBoton={()=>setPedir(false)}/>)}
    </>
  );};
export default Menu;