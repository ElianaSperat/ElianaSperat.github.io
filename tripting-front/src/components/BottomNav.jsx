import React from "react";
import homeIcon from '../assets/home-green.png'
import tripIcon from '../assets/trip-green.png'
import addIcon from '../assets/add-green.png'
import userIcon from '../assets/user-green.png'
import { Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <Link to="/" className="nav-item">
                <img src={homeIcon} alt="Inicio" className="nav-icon" />
                <span>Inicio</span>
            </Link>
            <Link to="/listado-viajes" className="nav-item">
                <img src={tripIcon} alt="Viajes" className="nav-icon" />
                <span>Viajes</span>
            </Link>
            <Link to="/nuevo-viaje" className="nav-item">
                <img src={addIcon} alt="Agregar" className="nav-icon icon-center" />
            </Link>
            <Link to="/notificaciones" className="nav-item">
                <img src={userIcon} alt="Otro" className="nav-icon" />
                <span>Otro</span>
            </Link>
            <Link to="/perfil" className="nav-item">
                <img src={userIcon} alt="Perfil" className="nav-icon" />
                <span>Perfil</span>
            </Link>
        </nav>
    );
};

export default BottomNav;