import React from 'react';
import Header from '../../componentes/pages/header/header';
import MenuOpciones from '../../componentes/pages/menuOpciones/menuOpciones.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CardOrden from '../../componentes/pages/cardOrden/cardOrden.jsx';
import './miCuenta.css';
import Boton from '../../componentes/ui/boton/boton.jsx';
import asada from '../../assets/asada.png';
import chorizo from '../../assets/chorizo.png';
import carnitas from '../../assets/carnitas.png';
import { useEffect } from 'react';
function MiCuenta() {
    const [opcionesMenu, setOpcionesMenu] = useState(false);
    const [textosData, setTextosData] = useState(["Seguir ordenando"]);
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [datos, setDatos] = useState([]);
    const [local, setLocal] = useState([]);
    const [total, setTotal] = useState(0);
    const handlerClickOrdenar = () => {
        navigate('/ordenar');
    }
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);

        const pedidosFromStorage = JSON.parse(localStorage.getItem('pedidos'));
        const filteredPedidos = pedidosFromStorage.filter(pedido => pedido.nombre);
        setLocal(filteredPedidos);
        setTotal(localStorage.getItem('localTotal'));
        // Calcula el total
        // const total = filteredPedidos.reduce((acc, pedido) => {
        //   const subtotal = pedido.precio * pedido.cantidad;
        //   alert("total",pedido.precio)
        //   return acc + subtotal;
        // }, 0);
        // for(let a=0;a<local.length;a++){
        //     setTotal(local.precio*local.cantidad+total);
        // }

        // Establece el total como un número
        // setTotal(total);
    }, []); // Este efecto se ejecutará solo una vez al montar el componente



    fetch('http://localhost:8080/api/auth/pedidos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los datos.');
            }
        })
        .then(data => {
            console.log('Datos obtenidos:', data);
            // setDatos(data)
            setDatos(data.filter(producto => producto.estado === 'activo'));
        })
        .catch(error => {
            console.error('Error:', error.message);
        });



    const handlerEnviarPedido = () => {
        local.forEach(pedido => {
            const requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    mesa: "2",
                    noPedido: pedido.noPedido,
                    total: pedido.total,
                    orden: pedido.orden,
                })
            };

            fetch('http://localhost:8080/api/auth/crearPedido', requestOption)
                .then(response => {
                    if (response.ok) {
                        alert('Pedido enviado con éxito');
                    } else {
                        alert("Error al enviar el pedido");
                        throw new Error('Error al enviar el pedido.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        });
    }
    const handlerQuitarTodo = () => {
        //   localStorage.clear();
        localStorage.setItem('pedidos', "[]");
        localStorage.setItem('localTotal', 0);
        navigate("/mi-cuenta");
    }
    return (
        <>
            <Header onClick={() => setOpcionesMenu(true)} />
            {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={() => handlerClickOrdenar()} onClickBoton={() => setOpcionesMenu(false)} />)}
            <section className='seccionMiCuenta'>
                <div className='contenedorMiCuenta'>
                    {local.map((dato, key) => (
                        <CardOrden nombre={dato.nombre} precio={dato.precio} imagenAlimento={(() => {
                            if (dato.imagen === 'asada') return asada;
                            else if (dato.imagen === 'chorizo') return chorizo;
                            else if (dato.imagen === 'carnitas') return carnitas;
                          })()} />
                    ))}
                    {/* {local.length > 0 && local.map((dato, key) => (
                        <CardOrden
                            key={key}
                            nombre={dato.nombre}
                            precio={dato.precio}
                            imagenAlimento={() => {
                                if (dato.imagen === 'asada') return asada;
                                else if (dato.imagen === 'chorizo') return chorizo;
                                else if (dato.imagen === 'carnitas') return carnitas;
                            }}
                        />
                    ))} */}
                    <div className='seccionesMicuenta'>

                        <div className='seccion2Micuenta'>
                            {/* <h4>subtotal: $30</h4> */}
                            <h4>IVA: 16%</h4>
                        </div>
                        <div className='seccion3Micuenta'>
                            <h2>TOTAL: ${total}</h2>
                        </div>
                        <div className='seccionBotones'>
                            <Boton onClick={() => handlerEnviarPedido()} textoBoton="Enviar pedido" />
                            <Boton onClick={() => handlerQuitarTodo()} textoBoton="Quitar todo" className="botonQuitar" />
                            <Boton onClick={() => handlerSeguirOrdenando()} textoBoton="Seguir ordenando" className="botonSeguirOrdenando" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};
export default MiCuenta;