import React from 'react';
import { useNavigate } from 'react-router-dom';
import locationIcon from '../assets/location-white.png'
import calendarIcon from '../assets/calendar-white.png'

const TripItem = ({ trip }) => {
    const navigate = useNavigate();

    return (
        <div
            className="trip-item"
            onClick={() => navigate(`/acciones/${trip._id}`)}
        >
            <h2>{trip.nombreDelViaje}</h2>
            <ul className="trip-details">
                <li>
                    <img src={locationIcon} alt="Destino" className="detail-icon" />
                    <strong>{trip.destino}</strong>
                </li>
                <li>
                    <img src={calendarIcon} alt="Fecha" className="detail-icon" />
                    <strong>{new Date(trip.fechaInicio).toLocaleDateString('es-AR')}</strong> al
                    <strong> {new Date(trip.fechaFin).toLocaleDateString('es-AR')}</strong>
                </li>
                <li className="trip-budget">
                    <span className="badge badge-success">
                        ${trip.presupuestoTotal.toLocaleString('es-AR')}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default TripItem;