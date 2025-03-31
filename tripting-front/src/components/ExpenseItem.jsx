import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExpenseItem = ({ expense, isHighlighted }) => {
    const navigate = useNavigate();

    return (
        <div
           className={`expense-item ${isHighlighted ? 'expense-item--highlighted' : ''}`}
            onClick={() => navigate(`/detalle-gasto/${expense.viajeId}/${expense._id}`)}
        >
            <div className="expense-content">
                <span className="expense-description">{expense.descripcion}</span>
                <span className="expense-amount">${expense.monto.toLocaleString('es-AR')}</span>
            </div>
        </div>
    );
};

export default ExpenseItem;