import React from 'react';
import Header from '../../componentes/pages/header/header';
import { useState } from 'react';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones';
import CardAcPedido from '../../componentes/pages/cardAceptarPedido/cardAcPedido';
import { useNavigate } from 'react-router';
function AceptarPedidos (){
    const [opcionesMenu, setOpcionesMenu] = useState(false);
    const [textosData, setTextosData] = useState(["Historial de venta", "Aceptar pedidos"]);
    const navigate=useNavigate();
    // const [textosPData,setTextosPData]=useState(["1 taco al pastor","2 taco asada","5 tacos chistorra","subtotal: $80","total:$100"]);
    const textosPData = JSON.stringify([
        { op1: "1 taco al pastor", op2: "2 taco asada", subtotal: "$10", total: "$20" },
        { op1: "3 taco al pastor", op2: "4 taco asada", subtotal: "$30", total: "$40" },
        { op1: "5 taco al pastor", op2: "6 taco asada", subtotal: "$50", total: "$60" },
        { op1: "7 taco al pastor", op2: "8 taco asada", subtotal: "$70", total: "$80" },
        { op1: "9 taco al pastor", op2: "10 taco asada", subtotal: "$90", total: "$100" }
      ]);
      const handlerClickOrdenar=()=>{navigate('/historial-Ventas');}
      const handlerClickAdios=()=>{setOpcionesMenu(false)}
  return (
    <>
    <Header onClick={() => setOpcionesMenu(true)}/>
    {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={(index) => index === 0 ? handlerClickOrdenar() : handlerClickAdios()} onClickBoton={() => setOpcionesMenu(false)}/>)}
    <CardAcPedido textosData={textosPData}/>
    </>
  );
};
export default AceptarPedidos;