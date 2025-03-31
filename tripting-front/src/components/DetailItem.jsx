import React from 'react';

const DetailItem = ({
	label,
	value,
	icon,
	iconAlt = "",
	isLast = false
}) => {
	return (
		<div className={`detail-item ${isLast ? 'no-border' : ''}`}>
			<div className="detail-label-container">
				{icon && <img
					src={icon}
					alt={iconAlt}
					className="detail-icon"
				/>}
				<span className="detail-label">{label}</span>
			</div>
			<span className="detail-value">{value}</span>
		</div>
	);
};

export default DetailItem;