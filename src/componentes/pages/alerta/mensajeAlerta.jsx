import React from 'react';
import Boton from '../../ui/boton/boton.jsx';
import Input from '../../ui/input/input';
import './alerta.css';
function MensajeAlerta (props){
  return (
    <>
      <div className='divAlerta'>
        <div className='alertaCuadro'>
        <h2>{props.textoAlerta}</h2>
        {/* <Input type="number" className="inputAlerta" placeholder="0"/> */}
        <Boton onClick={props.onClickBoton} className="botonAlerta" textoBoton={props.textoBotonAlerta}/>
        </div>
    </div>
    </>
  );
};

export default MensajeAlerta;