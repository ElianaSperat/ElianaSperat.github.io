import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function EditTrip() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        destino: "",
        fechaInicio: "",
        fechaFin: "",
        presupuestoTotal: "",
        nombreDelViaje: "",
        idUsuarios: []
    });

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch(`http://localhost:3000/destinos/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': JSON.parse(localStorage.getItem('user')).jwToken
                    },
                });
                const data = await response.json();
                setForm({
                    ...data,
                    fechaInicio: new Date(data.fechaInicio).toISOString().split('T')[0],
                    fechaFin: new Date(data.fechaFin).toISOString().split('T')[0]
                });
            } catch (error) {
                console.error('Error al obtener el viaje:', error);
            }
        };
        fetchTrip();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/destinos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': JSON.parse(localStorage.getItem('user')).jwToken
                },
                body: JSON.stringify({
                    ...form,
                    presupuestoTotal: parseInt(form.presupuestoTotal)
                })
            }).then(response => {
                if (response.status === 200) {
                    navigate('/listado-viajes');
                } else {
                    console.error('Error');
                    alert('Error al actualizar el viaje.');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='form-container'>
            <h1>Editar Viaje</h1>
            <div className="form-fields">
                <FormField
                    label="Destino"
                    type="text"
                    name="destino"
                    value={form.destino}
                    onChange={handleChange}
                    placeholder="Destino"
                />
                <FormField
                    label="Nombre del viaje"
                    type="text"
                    name="nombreDelViaje"
                    value={form.nombreDelViaje}
                    onChange={handleChange}
                    placeholder="Nombre del viaje"
                />
                <FormField
                    label="Presupuesto total"
                    type="number"
                    name="presupuestoTotal"
                    value={form.presupuestoTotal}
                    onChange={handleChange}
                    placeholder="Presupuesto total"
                />
                <FormField
                    label="Fecha de Inicio"
                    type="date"
                    name="fechaInicio"
                    value={form.fechaInicio}
                    onChange={handleChange}
                />
                <FormField
                    label="Fecha de Finalización"
                    type="date"
                    name="fechaFin"
                    value={form.fechaInifechaFinio}
                    onChange={handleChange}
                />
                <Button variant="primary" onClick={handleSend}>
                    Guardar Viaje
                </Button>
            </div>
        </div>
    );
}

export default EditTrip

{/* <div>
            <h1>Editar Viaje</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" name="destino" placeholder='Destino' value={form.destino} onChange={handleChange} />
                <input type="text" name="nombreDelViaje" placeholder='Nombre del viaje' value={form.nombreDelViaje} onChange={handleChange} />
                <input type="number" name="presupuestoTotal" placeholder='Presupuesto total' value={form.presupuestoTotal} onChange={handleChange} />
                <input type="date" name="fechaInicio" placeholder='Fecha de Inicio' value={form.fechaInicio} onChange={handleChange} />
                <input type="date" name="fechaFin" placeholder='Fecha de Finalización' value={form.fechaFin} onChange={handleChange} />

                <button className='button-main' onClick={handleSend}>Guardar Viaje</button>
            </div>
        </div> */}