import React from 'react';
import './menuOpciones.css';
import Input from '../../ui/input/input';
import Boton from '../../ui/boton/boton';

function MenuOpciones(props) {
  const botones = props.textosData.map((texto, index)=>(<Boton key={index} onClick={() => props.onClickBotonMap(index)} className="botonAlerta" textoBoton={texto}/>));

  return (
    <> 
      <div className='divAlertaMenu'>
        <div className='alertaCuadroMenu'>
          <h2>Opciones</h2>
          {botones}
          <Boton onClick={props.onClickBoton} className="botonAlerta" textoBoton="Regresar"/>
        </div>
      </div>
    </>
  );
};

export default MenuOpciones;