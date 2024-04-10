import React from 'react';
import Header from '../../componentes/pages/header/header';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones';
import { useState } from 'react';
import './HistorialVentas.css';
import Tr from '../../componentes/ui/tr/tr';
import data from './historialVentas';
import { useNavigate } from 'react-router';
function HistorialVentas() {
    const navigate=useNavigate();
    const [opcionesMenu, setOpcionesMenu] = useState(false);
    const [textosData, setTextosData] = useState(["Historial de venta", "Aceptar pedidos"]);
    const handlerClickOrdenar=()=>{setOpcionesMenu(false);}
    const handlerClickAdios=()=>{navigate('/aceptar-pedidos');}
    return (
        <>
            <Header onClick={() => setOpcionesMenu(true)} />
            {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={(index) => index === 0 ? handlerClickOrdenar(): handlerClickAdios()} onClickBoton={() => setOpcionesMenu(false)} />)}
            <table className='tabla'>
                <tr>
                    <th>Id</th>
                    <th>Mesa</th>
                    <th>Compra</th>
                    <th>Fecha</th>
                    <th>Total</th>
                </tr>
                {/* <tr>
                    <td>Fila 1, Celda 1</td>
                    <td>Fila 1, Celda 2</td>
                    <td>Fila 1, Celda 3</td>
                    <td>Fila 1, Celda 4</td>
                    <td>Fila 1, Celda 5</td>
                </tr> */}
                {data.map((data,key)=>(
                <Tr id={data.id} mesa={data.mesa} compra={data.compra} fecha={data.fecha} total={data.total}/>
                ))}
            </table>
        </>
    );
};
export default HistorialVentas;