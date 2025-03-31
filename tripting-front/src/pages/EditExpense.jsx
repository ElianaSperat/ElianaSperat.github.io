import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function EditExpense() {
    const navigate = useNavigate();
    const { id, expenseId } = useParams();
    const [form, setForm] = useState({
        descripcion: "",
        monto: "",
        fecha: "",
        idUsuario: "",
        idDestino: ""
    });

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

                if (!response.ok) {
                    throw new Error("Error al obtener el gasto");
                }

                const data = await response.json();
                console.log(data);

                if (data && data.descripcion) {
                    setForm({
                        descripcion: data.descripcion || "",
                        monto: data.monto || "",
                        fecha: data.fecha ? new Date(data.fecha).toISOString().split('T')[0] : "",
                        idUsuario: data.idUsuario || "",
                        idDestino: data.idDestino || ""
                    });
                } else {
                    console.error("El gasto recibido no es válido", data);
                }

            } catch (error) {
                console.error('Error al obtener el gasto:', error);
            }
        };

        fetchExpense();
    }, [expenseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!form.descripcion.trim()) {
            alert("La descripción del gasto es obligatoria.");
            return;
        }

        try {
            console.log("Datos enviados:", form);

            const response = await fetch(`http://localhost:3000/gastos/${expenseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth": JSON.parse(localStorage.getItem('user')).jwToken
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el gasto");
            }

            console.log("Gasto actualizado con éxito");
            navigate(`/gastos/${id}`, {
                state: { highlightedExpense: expenseId }
            });

        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Ocurrió un error al guardar los cambios");
        }
    };

    return (
        <div className='form-container'>
            <h1>Editar {form.descripcion}</h1>
            <div className="form-fields">
                <FormField
                    label="Descripción del Gasto"
                    type="text"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Ej: Cena en restaurante"
                />
                <FormField
                    label="Monto"
                    type="number"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                    placeholder="Ej: 2500"
                />
                <FormField
                    label="Fecha"
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                />
                <Button variant="primary" onClick={handleUpdate}>
                    Guardar Gasto
                </Button>
            </div>
        </div>
    );
}

export default EditExpense