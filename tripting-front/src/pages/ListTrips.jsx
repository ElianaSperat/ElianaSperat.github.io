import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TripItem from '../components/TripItem';
import Button from '../components/Button';

function ListTrips() {
	const navigate = useNavigate()
	const [trips, setTrips] = useState([])

	useEffect(() => {
		try {
			const response = fetch('http://localhost:3000/destinos', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth': JSON.parse(localStorage.getItem('user')).jwToken
				},
			}).then(async response => {
				console.log(response)
				const data = await response.json()
				setTrips(data.destinos)
				console.log(data)
			})

		} catch (error) {
			console.error('Error:', error)
		}
	}, [])

	return (
		<div className="form-container">
			<h1>Próximos Viajes</h1>

			{trips.length > 0 ? (
				<div className="list-trips">
					{trips.map(trip => (
						<TripItem key={trip._id} trip={trip} />
					))}
				</div>
			) : (
				<p className="no-trips">No hay próximos viajes.</p>
			)}

			<Button className='button-main' onClick={() => navigate('/nuevo-viaje')}>Nuevo Viaje</Button>
		</div>
	)
}

export default ListTrips