import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewTrip from './pages/NewTrip'
import ListTrips from './pages/ListTrips'
import EditTrip from './pages/EditTrip'
import Login from './pages/Login'
import Register from './pages/Register'
import Actions from './pages/Actions'
import Expenses from './pages/Expenses'
import NewExpense from './pages/NewExpense'
import ExpenseDetail from './pages/ExpenseDetail';
import EditExpense from './pages/EditExpense';
import List from './pages/List'
import NewListItem from './pages/NewListItem'
import ItemDetail from './pages/ItemDetail'
import EditListItem from './pages/EditListItem'
import Calendar from './pages/Calendar'
import Stays from './pages/Stays'
import Transfers from './pages/Transfers'
import BottomNav from './components/BottomNav.jsx'
import BackButton from './components/BackButton.jsx'

function App() {

	return (
		<>
			<Router>
				<div className="app-container">
					<BackButton />
					<div className="content-wrap">
						<Routes>
							<Route path='/nuevo-viaje' element={<NewTrip />} />
							<Route path='/listado-viajes' element={<ListTrips />} />
							<Route path='/editar-viaje/:id' element={<EditTrip />} />
							<Route path='/iniciar-sesion' element={<Login />} />
							<Route path='/registrarse' element={<Register />} />
							<Route path='/acciones/:id' element={<Actions />} />
							<Route path='/gastos/:id' element={<Expenses />} />
							<Route path='/nuevo-gasto/:id' element={<NewExpense />} />
							<Route path='/detalle-gasto/:id/:expenseId' element={<ExpenseDetail />} />
							<Route path='/editar-gasto/:id/:expenseId' element={<EditExpense />} />
							<Route path='/lista/:id' element={<List />} />
							<Route path='/nuevo-item/:id' element={<NewListItem />} />
							<Route path='/detalle-item/:id/:itemId' element={<ItemDetail />} />
							<Route path='/editar-item/:id/:itemId' element={<EditListItem />} />
							<Route path='/actividades/:id' element={<Calendar />} />
							<Route path='/estadias/:id' element={<Stays />} />
							<Route path='/traslados/:id' element={<Transfers />} />
							<Route path='*' element={<h1>404 - Página No Encontrada</h1>} />
						</Routes>
					</div>
					<BottomNav />
				</div>
			</Router>
		</>
	)
}

export default App
