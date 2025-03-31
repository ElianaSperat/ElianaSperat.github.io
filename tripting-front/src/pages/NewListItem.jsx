import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function NewListItem() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [form, setForm] = useState({
        nombreItem: "",
        asignadoA: "",
        fechaLimite: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/listas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    idDestino: id,
                    estado: "Pendiente",
                }),
            });

            if (response.ok) {
                console.log("Elemento creado con éxito");
                navigate('/lista/' + id);
            } else {
                console.error("Error al crear el ítem");
                console.error("Error del servidor:", errorData);
                alert("Hubo un problema al crear el ítem.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='form-container'>
            <h1>Nuevo Ítem</h1>
            <div className="form-fields">
                <FormField
                    label="Nombre del Ítem"
                    type="text"
                    name="nombreItem"
                    value={form.nombreItem}
                    onChange={handleChange}
                    placeholder="Cargador"
                />
                <FormField
                    label="Asignado a"
                    type="text"
                    name="asignadoA"
                    value={form.asignadoA}
                    onChange={handleChange}
                    placeholder="Asignar a (opcional)"
                />
                <FormField
                    label="Fecha límite"
                    type="date"
                    name="fechaLimite"
                    value={form.fechaLimite}
                    onChange={handleChange}
                    placeholder="Fecha Límite (opcional)"
                />

                <Button variant="primary" onClick={handleSend}>
                    Crear Íeam
                </Button>
            </div>
        </div>
    );
}

export default NewListItem;
