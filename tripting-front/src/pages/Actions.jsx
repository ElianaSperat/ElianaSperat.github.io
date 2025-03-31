import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button';

function Actions() {

    const { id } = useParams();

    const [trip, setTrip] = useState(null)

    useEffect(() => {
        try {
            const response = fetch('http://localhost:3000/destinos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': JSON.parse(localStorage.getItem('user')).jwToken
                },
            }).then(async response => {
                console.log(response)
                const data = await response.json()
                setTrip(data)
                console.log(data)
            })

        } catch (error) {
            console.error('Error:', error)
        }
    }, [])

    return (
        <div className="form-container">
            {trip && <>
                <h1>{trip.nombreDelViaje}</h1>
                <div>
                    <Link to={'/gastos/' + trip._id}><Button className='button-action'>Gastos</Button></Link>
                    <Link to={'/lista/' + trip._id}><Button className='button-action'>Lista</Button></Link>
                    <Link to={'/actividades/' + trip._id}><Button className='button-action'>Actividades</Button></Link>
                    <Link to={'/estadias/' + trip._id}><Button className='button-action'>Estadías</Button></Link>
                    <Link to={'/traslados/' + trip._id}><Button className='button-action'>Traslados</Button></Link>
                </div>

                <div className='actions-footer'>
                    <p>Sos el único participante.</p>
                    <div className="icono-texto">
                        <img src="/src/assets/enlace.png" alt="Icono del Enlace" />
                        <p>Enlace del viaje</p>
                    </div>
                    <div className="icono-texto">
                        <img src="/src/assets/compartir.png" alt="Icono para Compartir" />
                        <p>Agregar participantes</p>
                    </div>
                    <div className="icono-texto">
                        <img src="/src/assets/editar.png" alt="Icono para editar el viaje" />
                        <Link to={'/editar-viaje/' + trip._id}>
                            <p>Editar viaje</p>
                        </Link>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Actions