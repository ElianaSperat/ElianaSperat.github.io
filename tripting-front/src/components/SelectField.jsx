// SelectField.js
import React from "react";

const SelectField = ({ label, name, value, onChange, options }) => {
    return (
        <div className="select-field">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;