import React from "react";
import { useNavigate } from "react-router-dom";

const MeetingRoomHistory: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='content-section'>
			<div className='empty-state'>
				<i className='bx bx-calendar-x'></i>
				<h3>No Meeting Room Bookings</h3>
				<p>You haven't booked any meeting rooms yet.</p>
				<button
					className='cta-button'
					onClick={() => navigate("/meeting-rooms")}
				>
					Book a Meeting Room
				</button>
			</div>
		</div>
	);
};

export default MeetingRoomHistory;
