import React from "react";
import { useNavigate } from "react-router-dom";

const VirtualOfficeHistory: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='content-section'>
			<div className='empty-state'>
				<i className='bx bx-building-house'></i>
				<h3>No Virtual Office History</h3>
				<p>
					You haven't subscribed to any virtual office services yet.
				</p>
				<button
					className='cta-button'
					onClick={() => navigate("/virtual-office")}
				>
					Explore Virtual Offices
				</button>
			</div>
		</div>
	);
};

export default VirtualOfficeHistory;
