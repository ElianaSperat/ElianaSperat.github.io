import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import FilterButtons from '../components/FilterButtons.jsx';
import Button from '../components/Button.jsx';

function List() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [trip, setTrip] = useState([null]);
    const [items, setItems] = useState([]);
    const [filtro, setFiltro] = useState("Lista");

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

    useEffect(() => {
        try {
            const response = fetch('http://localhost:3000/listas/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': JSON.parse(localStorage.getItem('user')).jwToken
                },
            }).then(async response => {
                console.log(response)
                const data = await response.json()
                setItems(data.items || []);
                console.log(data)
            })
        } catch (error) {
            console.error('Error al obtener items:', error);
        }

    }, []);

    const handleItemClick = (itemId) => {
        navigate(`/detalle-item/${id}/${itemId}`);
    };

    const obtenerItemsFiltrados = () => {
        switch (filtro) {
            case "Pendientes":
                return items.filter(item => item.estado === "Pendiente");
            case "Listos":
                return items.filter(item => item.estado === "Listo");
            case "Asignados":
                return items.filter(item => item.asignadoA === userId);
            default:
                return items;
        }
    };

    return (
        <div className='form-container'>
            {trip && <>
                <h1>No se está trayendo el nombre del trip{trip.ubicacion}</h1>
                <FilterButtons activeFilter={filtro} onFilterChange={setFiltro} />

                {obtenerItemsFiltrados().length > 0 ? (
                    obtenerItemsFiltrados().map(item => (
                        <div
                            key={item._id}
                            className="item-card"
                            onClick={() => handleItemClick(item._id)}
                        >
                            <h2>{item.nombreItem}</h2>
                            <p>Fecha Límite {item.fechaLimite ? new Date(item.fechaLimite).toLocaleDateString('es-AR') : "No definida"}</p>
                            <p>Asignado a </p>
                            <p className={`badge ${item.estado === "Listo" ? "badge-success" : "badge-danger"}`}>
                                {item.estado}
                            </p>
                        </div>
                    ))
                ) : (
                    <div style={{ color: "white" }}>No hay ítems en la lista.</div>
                )}

                <Button type="primary" onClick={() => navigate(`/nuevo-item/${trip._id}`)}>
                    Nuevo Ítem
                </Button>
            </>}
        </div>
    )
}

export default List