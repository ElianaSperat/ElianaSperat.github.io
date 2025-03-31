import React from 'react';

const ConfirmationModal = ({
    message,
    confirmText = "Eliminar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    isDanger = true
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button
                        className={`modal-button ${isDanger ? 'modal-button--danger' : ''}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className="modal-button modal-button--cancel"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;