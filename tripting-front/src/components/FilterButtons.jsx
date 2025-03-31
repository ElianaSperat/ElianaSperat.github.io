import React from 'react';
import Button from './Button';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: "Todo",           label: "Todo",              type: "filter-all"      },
        { id: "Pendientes",     label: "Pendientes",        type: "filter-pending"  },
        { id: "Listos",         label: "Listos",            type: "filter-done"     },
        { id: "Asignados",      label: "Mis asignados",     type: "filter-assigned" }
    ];

    return (
        <div className="filter-buttons-container">
            {filters.map(filter => (
                <Button
                    key={filter.id}
                    type={filter.type}
                    onClick={() => onFilterChange(filter.id)}
                    disabled={activeFilter === filter.id}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
};

export default FilterButtons;