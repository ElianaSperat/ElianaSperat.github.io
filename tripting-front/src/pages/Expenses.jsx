import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExpenseItem from '../components/ExpenseItem';
import Button from '../components/Button';
import { useLocation } from 'react-router-dom';

function Expenses() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [trip, setTrip] = useState(null)
    const [expenses, setExpenses] = useState([])
    const location = useLocation();
    const [highlightedId, setHighlightedId] = useState(null);

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
                setTrip(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTrip();
    }, [id]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`http://localhost:3000/gastos/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': JSON.parse(localStorage.getItem('user')).jwToken
                    },
                });
                const data = await response.json();
                setExpenses(data.gastos);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchExpenses();
    }, [id]);

    useEffect(() => {
        console.log("ID a resaltar:", location.state?.highlightedExpense);
        if (location.state?.highlightedExpense) {
            setHighlightedId(location.state.highlightedExpense);
            const timer = setTimeout(() => setHighlightedId(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleItemClick = (expenseId) => {
        navigate(`/detalle-gasto/${id}/${expenseId}`);
    };

    return (
        <div className='form-container'>
            {trip && (
                <>
                    <h1>{trip.ubicacion}</h1>
                    <div className='budget-display'>
                        <p>Presupuesto actual</p>
                        ${trip.presupuestoRestante}
                    </div>

                    <div className="expenses-list">
                        {expenses.map(expense => (
                            <div
                                key={expense._id}
                                className={highlightedId === expense._id ? 'expense-item--highlighted' : ''}
                            >
                                <ExpenseItem
                                    expense={{ ...expense, viajeId: id }}
                                    isHighlighted={highlightedId === expense._id}
                                />
                            </div>
                        ))}
                    </div>

                    <Button className='button-primary' onClick={() => navigate(`/nuevo-gasto/${trip._id}`)}>Nuevo Gasto</Button>
                </>

            )}

        </div>
    )
}

export default Expenses