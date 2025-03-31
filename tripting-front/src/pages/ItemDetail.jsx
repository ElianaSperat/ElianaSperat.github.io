import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailItem from "../components/DetailItem.jsx";
import userIcon from '../assets/user-green.png';
import calendarIcon from '../assets/calendar-green.png';
import ActionButtons from "../components/ActionButtons";
import ConfirmationModal from '../components/ConfirmationModal';

function ItemDetail() {
    const navigate = useNavigate();
    const { id, itemId } = useParams();
    const [item, setItems] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
                setItems(data.items.find(i => i._id === itemId) || null);
                console.log(data)
            })
        } catch (error) {
            console.error('Error al obtener items:', error);
        }

    }, []);

    const handleEdit = () => {
        navigate(`/editar-item/${id}/${itemId}`);
    };

    const handleDelete = async () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:3000/listas/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': JSON.parse(localStorage.getItem('user')).jwToken
                },
            });
            navigate(`/lista/${id}`);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (!item) {
        return <div>Cargando...</div>;
    }

    return (

        <div className="detail-container">
            <h1 className="detail-title">{item.nombreItem}</h1>
            <div>
                <div className='detail-list'>
                    <DetailItem
                        label="Asignado a: "
                        icon={userIcon}
                        iconAlt="Icono de usuario"
                        value={item.asignadoA || "Sin asignar"}
                    />
                    <DetailItem
                        label="Fecha límite: "
                        icon={calendarIcon}
                        iconAlt="Icono de calendario"
                        value={item.fechaLimite ? new Date(item.fechaLimite).toLocaleDateString('es-AR') : "No definida"}
                    />
                    <DetailItem
                        value={item.estado === "Listo" ? "Listo" : "Pendiente"}
                    />
                </div>

                <ActionButtons
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {showModal && (
                    <ConfirmationModal
                        message="¿Estás seguro que querés eliminar este gasto?"
                        confirmText="Sí, eliminar"
                        cancelText="Cancelar"
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default ItemDetail;
