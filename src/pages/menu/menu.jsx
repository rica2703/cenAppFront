import React, { useState } from 'react';
import Header from '../../componentes/pages/header/header';
import CardProducto from '../../componentes/pages/cardProducto/cardProducto';
import './menu.css';
import ejemplo from '../../assets/esp32.jpg';
import datos from './menu.js';
import Alerta from '../../componentes/pages/alerta/alerta.jsx';
function Menu (){
  const[pedir,setPedir]=useState(false);

  const handlerClick=(imagen,nombre,precio)=>{
    setPedir(true);
  }
  return (
    <>
    <Header/>
    {datos.map((data,key)=>(<CardProducto onClick={()=>handlerClick(data.imagen,data.nombre,data.precio)} imagenAlimento={data.imagen} nombreAlimento={data.nombre} precioAlimento={data.precio}/>))}
    {pedir&&(<Alerta onClickBoton={()=>setPedir(false)}/>)
    }

    </>
  );
};
export default Menu;