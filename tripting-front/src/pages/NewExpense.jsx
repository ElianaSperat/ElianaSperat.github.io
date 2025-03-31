import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function NewExpense() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState(null);
    const [validFields, setValidFields] = useState({});

    const [form, setForm] = useState({
        descripcion: "",
        monto: 0,
        fecha: ""
    })

    const validate  = (name, value) => {
        const newErrors = {};
        const descripcion = form.descripcion.trim();

        if (!descripcion) {
            newErrors.descripcion = "La descripción es requerida";
        } else if (descripcion.length < 3) {
            newErrors.descripcion = "La descripción debe tener al menos 3 caracteres";
        } else if (descripcion.length > 50) {
            newErrors.descripcion = "La descripción no puede exceder los 50 caracteres";
        }  else if (/[0-9]/.test(descripcion)) {
            newErrors.descripcion = "La descripción no puede contener números";
        } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(descripcion)) {
            newErrors.descripcion = "La descripción no puede contener caracteres especiales";
        }

        if (form.monto <= 0 || isNaN(form.monto)) {
            newErrors.monto = form.monto <= 0 ? "El monto debe ser mayor a cero" : "Ingrese un monto válido";
        }

        if (!form.fecha) {
            newErrors.fecha = "Selecciona una fecha válida";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSend = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:3000/gastos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    monto: parseInt(form.monto),
                    idUsuario: JSON.parse(localStorage.getItem('user')).usuario._id,
                    idDestino: id
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el gasto');
            }

            navigate('/gastos/' + id);
        } catch (error) {
            setGlobalError(error.message);
        }
    };

    return (
        <div className='form-container'>
            <h1>Nuevo Gasto</h1>
            <div className="form-fields">
                <FormField
                    label="Descripción"
                    type="text"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Cena en restaurante"
                    error={errors.descripcion}
                />
                <FormField
                    label="Monto"
                    type="number"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                    placeholder=""
                    error={errors.monto}
                />
                <FormField
                    label="Fecha"
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    placeholder=""
                    error={errors.fecha}
                />

                <Button variant="primary" onClick={handleSend}>
                    Crear Gasto
                </Button>

            </div>
        </div>
    )
}

export default NewExpense