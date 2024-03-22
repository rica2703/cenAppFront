import './cardProducto.css';
import Boton from '../../ui/boton/boton.jsx';
import React from 'react';
function CardProducto (props){
  return (
    <>
    {/* style={{ backgroundImage: `url(${props.imagenAlimento})` }} */}
    <div className='cardProducto'  >
        <img src={props.imagenAlimento} alt="" />
        <h4>{props.nombreAlimento}</h4>
        <p>{props.precioAlimento}</p>
        <Boton textoBoton="Pedir" onClick={props.onClick} className="botonCardProducto"/>
    </div>
    </>
  );
};
export default CardProducto;