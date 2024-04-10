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
function MiCuenta() {
    const [opcionesMenu, setOpcionesMenu] = useState(false);
  const [textosData, setTextosData] = useState(["Seguir ordenando"]);
    const navigate = useNavigate();
    const handlerClickOrdenar = () => {
        navigate('/ordenar');
    }
    const alimento = [{
        nombre: "taco de asada",
        precio: "15",
        foto: asada,
    },
    {
        nombre: "taco de alpastor",
        precio: "5",
        foto: chorizo,
    },
    {
        nombre: "taco de tripas",
        precio: "13",
        foto: asada,
    }, {
        nombre: "tacos de maciza",
        precio: "18",
        foto: chorizo,
    },
    ];
    return (
        <>
            <Header onClick={() => setOpcionesMenu(true)} />
            {opcionesMenu && (<MenuOpciones textosData={textosData} onClickBotonMap={() => handlerClickOrdenar()} onClickBoton={() => setOpcionesMenu(false)} />)}
            <section className='seccionMiCuenta'>
                <div className='contenedorMiCuenta'>
                    {alimento.map((dato, key) => (
                        <CardOrden nombre={dato.nombre} precio={dato.precio} imagenAlimento={dato.foto} />
                    ))}
                    <div className='seccionesMicuenta'>

                        <div className='seccion2Micuenta'>
                            <h4>subtotal: $30</h4>
                            <h4>IVA: 16%</h4>
                        </div>
                        <div className='seccion3Micuenta'>
                            <h2>TOTAL: $308</h2>
                        </div>
                        <div className='seccionBotones'>
                            <Boton textoBoton="Enviar pedido" />
                            <Boton textoBoton="Quitar todo" className="botonQuitar" />
                            <Boton textoBoton="Seguir ordenando" className="botonSeguirOrdenando" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};
export default MiCuenta;