import React from 'react';
import './header.css';
import logo from '../../../assets/logoCenAppNegro.png';
import opciones from '../../../assets/opciones.png';
import Input from '../../ui/input/input';
function Header (props){
  return (
    <>
    <header className='headerNaranja'>
        <img src={logo} alt="" />
        <Input className="inputHeader"  placeholder="Buscar"/>
        <img src={opciones} onClick={props.onClick} alt="" />
    </header>
    </>
  );
};
export default Header;