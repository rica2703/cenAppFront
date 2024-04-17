import React, { useEffect } from 'react';
import Header from '../../componentes/pages/header/header';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones';
import { useState } from 'react';
import './HistorialVentas.css';
import Tr from '../../componentes/ui/tr/tr';
// import data from './historialVentas';
import { useNavigate } from 'react-router';
function HistorialVentas() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [opcionesMenu, setOpcionesMenu] = useState(false);
    const [textosData, setTextosData] = useState(["Historial de venta", "Aceptar pedidos"]);
    const handlerClickOrdenar = () => { setOpcionesMenu(false); }
    const handlerClickAdios = () => { navigate('/aceptar-pedidos'); }
    const [datos, setdatos] = useState([]);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);
    }, []);
    fetch('http://localhost:8080/api/auth/reporte', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    })
        .then(response => {
            if (response.ok) {
                // Si la respuesta del servidor es exitosa (código de estado 200),
                // parseamos la respuesta como JSON y la devolvemos
                return response.json();
            } else {
                // Si el servidor devuelve un código de estado de error, lanzamos una excepción con un mensaje de error
                throw new Error('Error al obtener los datos.');
            }
        })
        .then(data => {
            // Si todo va bien y se recibe una respuesta válida del servidor, se ejecuta esta parte
            console.log('Datos obtenidos:', data);
            setdatos(data)
            // Puedes realizar acciones adicionales con los datos, como actualizar el estado de tu aplicación
        })
        .catch(error => {
            // Si ocurre algún error en el proceso, se captura aquí
            console.error('Error:', error.message);
            // Aquí puedes mostrar un mensaje de error al usuario, informando sobre lo que ha salido mal
        });
    return (
        <>
            <Header onClick={() => setOpcionesMenu(true)} />
            {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={(index) => index === 0 ? handlerClickOrdenar() : handlerClickAdios()} onClickBoton={() => setOpcionesMenu(false)} />)}
            <table className='tabla'>
                <tr>
                    {/* <th>Id</th> */}
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
                {datos.map((data, key) => (
                    <Tr id={data.id} mesa={data.mesa} compra={data.pedido} fecha={data.fecha} total={data.total} />
                ))}
            </table>
        </>
    );
};
export default HistorialVentas;