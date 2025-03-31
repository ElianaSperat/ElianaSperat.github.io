import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';

function EditListItem() {
    const navigate = useNavigate();
    const { id, itemId } = useParams();
    const [form, setForm] = useState({
        nombreItem: "",
        asignadoA: "",
        fechaLimite: "",
        estado: "Pendiente",
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/listas/item/${itemId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': JSON.parse(localStorage.getItem('user')).jwToken
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener el ítem");
                }

                const data = await response.json();
                console.log(data);

                if (data && data.nombreItem) {
                    setForm({
                        nombreItem: data.nombreItem || "",
                        asignadoA: data.asignadoA || "",
                        fechaLimite: data.fechaLimite ? new Date(data.fechaLimite).toISOString().split('T')[0] : "",
                        estado: data.estado || "Pendiente",
                    });
                } else {
                    console.error("El ítem recibido no es válido", data);
                }

            } catch (error) {
                console.error('Error al obtener el ítem:', error);
            }
        };

        fetchItem();
    }, [itemId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!form.nombreItem.trim()) {
            alert("El nombre del ítem es obligatorio.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/listas/item/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth": JSON.parse(localStorage.getItem('user')).jwToken
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                console.log("Elemento actualizado con éxito");
                navigate(`/lista/${id}`);
            } else {
                console.error("Error al actualizar el ítem");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
        }
    };

    return (
        <div className='form-container'>
            <h1>Editar {form.nombreItem}</h1>
            <div className="form-fields">
                <FormField
                    label="Nombre del Ítem"
                    type="text"
                    name="nombreItem"
                    value={form.nombreItem}
                    onChange={handleChange}
                />
                <FormField
                    label="Asignar a (opcional)"
                    type="text"
                    name="asignadoA"
                    value={form.asignadoA}
                    onChange={handleChange}
                />
                <FormField
                    label="Fecha Límite (opcional)"
                    type="date"
                    name="fechaLimite"
                    value={form.fechaLimite}
                    onChange={handleChange}
                />
                <SelectField
                    label="Estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    options={[
                        { value: "Pendiente", label: "Pendiente" },
                        { value: "Listo", label: "Listo" }
                    ]}
                />
                <Button variant="primary" onClick={handleUpdate}>
                    Guardar Ítem
                </Button>
            </div>
        </div>
    );
}

export default EditListItem;