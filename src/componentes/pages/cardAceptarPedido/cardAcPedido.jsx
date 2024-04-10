import React from 'react';
import Boton from '../../ui/boton/boton';
import './cardACPedido.css';
function CardAcPedido(props) {
  // Convertir la cadena JSON en un arreglo de objetos
  const textosData = JSON.parse(props.textosData);

  // Iterar sobre el arreglo de objetos y renderizar cada uno
  const textosP = textosData.map((item, index) => (
    <div className='contenedorTextosAceptarPedidos' key={index}>
        <div className='textosPedidosAceptar'>
      <p>{item.op1}</p>
      <p>{item.op2}</p>
      <p>{item.subtotal}</p>
      <p>{item.total}</p>
      </div>
      <div className='contenedorBotonesPedidos'>
      <Boton textoBoton="X" className="botonXPedidos"/>
      <Boton textoBoton="✓"/>
      </div>
    </div>
  ));

  return (
    <>
      <div className='contenedorPadreAceptarPedidos'>
        {textosP}
      </div>
    </>
  );
}

export default CardAcPedido;
