import React from 'react';
import Button from './Button';

const ActionButtons = ({ onEdit, onDelete }) => {
    return (
        <div className="action-buttons">
            <Button type="secondary" onClick={onEdit}>Editar</Button>
            <Button type="danger" onClick={onDelete}>Eliminar</Button>
        </div>
    );
};

export default ActionButtons;