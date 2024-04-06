import React from 'react';
import './menuOpciones.css';
import Input from '../../ui/input/input';
import Boton from '../../ui/boton/boton';
function MenuOpciones (props){
  return (
    <> 
    <div className='divAlertaMenu'>
    <div className='alertaCuadroMenu'>
    <h2>Opciones</h2>
    <Boton onClick={props.onClickOpcion1} className="botonAlerta" textoBoton={props.texto}/>
    <Boton onClick={props.onClickBoton} className="botonAlerta" textoBoton="Regresar"/>

    </div>
</div>
    </>
  );
};
export default MenuOpciones;