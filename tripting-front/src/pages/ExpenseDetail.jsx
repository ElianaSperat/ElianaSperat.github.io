import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import DetailItem from "../components/DetailItem.jsx";
import calendarIcon from '../assets/calendar-green.png';
import amountIcon from '../assets/amount-green.png';
import userIcon from '../assets/user-green.png';
import ConfirmationModal from '../components/ConfirmationModal';

function ExpenseDetail() {
    const { id, expenseId } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`http://localhost:3000/gastos/detalle/${expenseId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': JSON.parse(localStorage.getItem('user')).jwToken
                    },
                });
                const data = await response.json();
                setExpense(data);
                console.log(data);

                const userResponse = await fetch(`http://localhost:3000/usuarios/${data.idUsuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': JSON.parse(localStorage.getItem('user')).jwToken
                    },
                });
                const userData = await userResponse.json();
                setUsuario(userData);
                console.log(userData);

            } catch (error) {
                console.error('Error al obtener el gasto:', error);
            }
        };
        fetchExpense();
    }, [expenseId]);

    const handleEdit = () => {
        navigate(`/editar-gasto/${id}/${expenseId}`);
    };

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:3000/gastos/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': JSON.parse(localStorage.getItem('user')).jwToken
                },
            });
            navigate(`/gastos/${id}`);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (!expense || !usuario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="detail-container">
            <h1 className="detail-title">{expense.descripcion}</h1>
            <div>
                <div className="detail-list">
                    <DetailItem
                        label="Monto:"
                        icon={amountIcon}
                        iconAlt="Icono de pesos"
                        value={`$${expense.monto.toLocaleString('es-AR')}`}
                    />
                    <DetailItem
                        label="Pagado por:"
                        icon={userIcon}
                        iconAlt="Icono de usuario"
                        value={usuario.nombre}
                    />
                    <DetailItem
                        label="Fecha:"
                        value={new Date(expense.fecha).toLocaleDateString('es-AR')}
                        icon={calendarIcon}
                        iconAlt="Icono de calendario"
                        isLast={true}
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

export default ExpenseDetail;