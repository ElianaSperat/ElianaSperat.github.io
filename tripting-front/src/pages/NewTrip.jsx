import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function NewTrip() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        destino: "",
        fechaInicio: "",
        fechaFin: "",
        presupuestoTotal: "",
        nombreDelViaje: "",
        idUsuarios: [JSON.parse(localStorage.getItem('user')).usuario._id] // Asignar el usuario logueado por defecto
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    /*const handleSelect = (e) => {
        console.log(e.target.value)
        setForm({
            ...form,
            hospedajeEstadoDePago: e.target.value
        });
    }*/

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/destinos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    presupuestoTotal: parseInt(form.presupuestoTotal)
                })
            }).then(response => {
                console.log(response)
                if (response.status == 200) {
                    console.log(response.status)
                    console.log('Success:', response)
                    navigate('/listado-viajes')
                } else {
                    console.error('Error')
                    alert('Error al crear el viaje.')
                }
            })

        } catch (error) {
            console.error('Error:', error)
        }
    };

    return (
        <div className='form-container'>
            <h1>Nuevo Viaje</h1>
            <div className="form-fields">
                <FormField
                    label="Indicá el destino"
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
                    placeholder="Fecha de Inicio"
                />
                <FormField
                    label="Fecha de Finalización"
                    type="date"
                    name="fechaFin"
                    value={form.fechaFin}
                    onChange={handleChange}
                    placeholder="Fecha de Finalización"
                />

                <Button variant="primary" onClick={handleSend}>
                    Crear Viaje
                </Button>
            </div>

        </div>
    )
}

export default NewTrip

{/* <div>
            <h1>Nuevo Viaje</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" name="destino" placeholder='Destino' value={form.destino} onChange={handleChange} />
                <input type="text" name="nombreDelViaje" placeholder='Nombre del viaje' value={form.nombreDelViaje} onChange={handleChange} />
                <input type="number" name="presupuestoTotal" placeholder='Presupuesto total' value={form.presupuestoTotal} onChange={handleChange} />
                <input type="date" name="fechaInicio" placeholder='Fecha de Inicio' value={form.fechaInicio} onChange={handleChange} />
                <input type="date" name="fechaFin" placeholder='Fecha de Finalización' value={form.fechaFin} onChange={handleChange} />

                <button className='button-main' onClick={handleSend}>Crear Viaje</button>
            </div>

        </div> */}