import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("meeting-rooms");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const handleLogout = () => {
		// Clear any auth tokens here
		navigate("/");
	};

	const menuItems = [
		{
			id: "meeting-rooms",
			label: "Meeting Room History",
			icon: "bx-calendar",
		},
		{
			id: "virtual-office",
			label: "Virtual Office History",
			icon: "bx-building",
		},
		{ id: "profile", label: "Profile", icon: "bx-user" },
		{ id: "logout", label: "Logout", icon: "bx-log-out" },
	];

	const handleMenuClick = (id: string) => {
		if (id === "logout") {
			handleLogout();
		} else {
			setActiveTab(id);
		}
	};

	return (
		<div className='dashboard-wrapper'>
			{/* Sidebar */}
			<div
				className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}
			>
				<button
					className='sidebar-toggle'
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					<i
						className={`bx ${isSidebarOpen ? "bx-chevron-left" : "bx-chevron-right"}`}
					></i>
				</button>

				<div className='sidebar-content'>
					<div className='sidebar-header'>
						<i className='bx bx-user-circle'></i>
						{isSidebarOpen && <h3>Dashboard</h3>}
					</div>

					<nav className='sidebar-menu'>
						{menuItems.map((item) => (
							<button
								key={item.id}
								className={`menu-item ${activeTab === item.id ? "active" : ""} ${item.id === "logout" ? "logout-item" : ""}`}
								onClick={() => handleMenuClick(item.id)}
								title={!isSidebarOpen ? item.label : ""}
							>
								<i className={`bx ${item.icon}`}></i>
								{isSidebarOpen && <span>{item.label}</span>}
							</button>
						))}
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className='dashboard-content'>
				<div className='dashboard-header'>
					<h1>
						{activeTab === "meeting-rooms"
							? "Meeting Room History"
							: activeTab === "virtual-office"
								? "Virtual Office History"
								: activeTab === "profile"
									? "My Profile"
									: "Dashboard"}
					</h1>
				</div>

				<div className='dashboard-main'>
					{activeTab === "meeting-rooms" && (
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
					)}

					{activeTab === "virtual-office" && (
						<div className='content-section'>
							<div className='empty-state'>
								<i className='bx bx-building-house'></i>
								<h3>No Virtual Office History</h3>
								<p>
									You haven't subscribed to any virtual office
									services yet.
								</p>
								<button
									className='cta-button'
									onClick={() => navigate("/virtual-office")}
								>
									Explore Virtual Offices
								</button>
							</div>
						</div>
					)}

					{activeTab === "profile" && (
						<div className='content-section'>
							<div className='profile-card'>
								<div className='profile-avatar'>
									<i className='bx bxs-user-circle'></i>
								</div>
								<div className='profile-info'>
									<div className='profile-field'>
										<label>Name</label>
										<input
											type='text'
											defaultValue='John Doe'
											readOnly
										/>
									</div>
									<div className='profile-field'>
										<label>Email</label>
										<input
											type='email'
											defaultValue='john.doe@example.com'
											readOnly
										/>
									</div>
									<div className='profile-field'>
										<label>Phone</label>
										<input
											type='tel'
											defaultValue='+91 98765 43210'
											readOnly
										/>
									</div>
									<div className='profile-field'>
										<label>Member Since</label>
										<input
											type='text'
											defaultValue='January 2024'
											readOnly
										/>
									</div>
									<button className='edit-button'>
										Edit Profile
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
