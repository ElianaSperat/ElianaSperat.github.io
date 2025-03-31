import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

function Register() {

	const navigate = useNavigate()

	const [userData, setUserData] = useState({
		nombre: "",
		apellido: "",
		mail: "",
		contrasena: ""
	})

	const [error, setError] = useState("")

	const handleRegister = (e) => {
		e.preventDefault()
		console.log(userData)
		axios.post("http://localhost:3000/usuarios", userData)
			.then((res) => {
				console.log("Registrando nuevo usuario...", res)
				localStorage.setItem('authToken', res.data.jwToken)
				//localStorage.setItem('authToken', jwToken);
				navigate('/iniciar-sesion')
			})
			.catch((error) => {
				setError(error.response.data.message)
				console.log("Error al registrar nuevo usuario...", error)
			})
	}

	/*const handleSend = async (e) => {
	  e.preventDefault();
	  try {
		const response = await fetch('http://localhost:3000/login', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(userData)
		}).then(async response => {
		  if (response.status == 200) {
			console.log(response.status)
			console.log('Success:', response)
			const data = await response.json()
			localStorage.setItem('user', JSON.stringify(data))
			//navigate('/listado-viajes')
		  } else {
			console.error('Error')
			alert('Usuario o contraseña incorrectos.')
			setUserData({
			  name: "",
			  mail: "",
			  contrasena: "",
			  repetirContrasena: ""
			})
		  }
		})
  
	  } catch (error) {
		console.error('Error:', error)
	  }
	};*/

	return (
		<div className="form-container">
			<img src="/src/assets/tripting-logo-blanco.png" alt="Logo Tripting" className='logo' />
			<h1>Crear una cuenta</h1>
			<div className="form-fields">
				<FormField
					label="Nombre"
					type="text"
					name="nombre"
					value={userData.nombre}
					onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
					placeholder=""
				/>
				<FormField
					label="Apellido"
					type="text"
					name="apellido"
					value={userData.apellido}
					onChange={(e) => setUserData({ ...userData, apellido: e.target.value })}
					placeholder=""
				/>
				<FormField
					label="Email"
					type="email"
					name="mail"
					value={userData.mail}
					onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
					placeholder=""
				/>
				<FormField
					label="Contraseña"
					type="password"
					name="contrasena"
					value={userData.contrasena}
					onChange={(e) => setUserData({ ...userData, contrasena: e.target.value })}
					placeholder=""
				/>

				<Button onClick={handleRegister} className="button-priary">Registrarse</Button>
				{
					error && <p>{error}</p>
				}
			</div>
		</div>
	)
}

export default Register