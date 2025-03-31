import React from "react";

const Button = ({ children, type = "primary", onClick, disabled = false }) => {
    return (
        <button
            className={`button-${type}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;