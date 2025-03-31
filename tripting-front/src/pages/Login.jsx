import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";

function Login() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		mail: "",
		contrasena: ""
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		});
	}

	const handleSend = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}).then(async response => {
				if (response.status == 200) {
					console.log(response.status)
					console.log('Success:', response)
					const data = await response.json()
					localStorage.setItem('user', JSON.stringify(data))
					navigate('/listado-viajes')
				} else {
					console.error('Error')
					alert('Usuario o contraseña incorrectos.')
					setForm({
						mail: "",
						contrasena: ""
					})
				}
			})

		} catch (error) {
			console.error('Error:', error)
		}
	};

	return (
		<div className="form-container">
			<img src="/src/assets/tripting-logo-blanco.png" alt="Logo Tripting" className='logo' />
			<h1>Ingresar a tu Cuenta</h1>
			<div className="form-fields">
				<FormField
					label="Mail"
					type="email"
					name="mail"
					value={form.mail}
					onChange={handleChange}
					placeholder=""
				/>
				<FormField
					label="Contraseña"
					type="password"
					name="contrasena"
					value={form.contrasena}
					onChange={handleChange}
					placeholder=""
				/>

				<Button className="button-priary" onClick={handleSend}>
					Iniciar Sesión
				</Button>
			</div>

			<p>¿Todavía no tenés una cuenta?</p>
			<a onClick={() => navigate("/registrarse")}>Registrarse</a>
		</div>
	)
}

export default Login