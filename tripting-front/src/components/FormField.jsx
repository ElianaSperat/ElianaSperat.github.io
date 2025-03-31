import React, { useState } from "react";
import ErrorMessage from '../components/ErrorMessage';

const FormField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`form-group ${error ? 'has-error' : ''}`}>
            <label htmlFor={name}>{label}</label>
            <div className="input-container">
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    aria-invalid={!!error}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <img src="/src/assets/ojo.png" alt="Mostrar contraseña" className='ojo' />
                    </button>
                )}
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};

export default FormField;