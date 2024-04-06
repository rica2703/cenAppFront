import React from 'react';
import Boton from '../../ui/boton/boton';
import './cardOrden.css';
import foto from '../../../assets/esp32.jpg';
function CardOrden(props) {
    return (
        <>
            <div className='contenedorOrden'>
                <img style={{ backgroundImage: `url(${props.imagenAlimento})` }} className='imagen' />
                <div className='contenedorDatosOrden'>
                    <h3>{props.nombre}</h3>
                    <h4>${props.precio}</h4>
                    <Boton className="botonEliminarOrden" textoBoton="Eliminar" />
                </div>
            </div>
        </>
    );
};

export default CardOrden;