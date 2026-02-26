import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import MeetingRoomHistory from "./MeetingRoomHistory";
import VirtualOfficeHistory from "./VirtualOfficeHistory";
import "./dashboard.css";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("meeting-rooms");
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	const handleLogout = () => {
		setShowLogoutConfirm(true);
	};

	const confirmLogout = () => {
		// Clear all auth state
		localStorage.clear();
		setShowLogoutConfirm(false);
		navigate("/");
	};

	const cancelLogout = () => {
		setShowLogoutConfirm(false);
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
		<div className='dashboard-container'>
			{/* Logout Confirmation Modal */}
			{showLogoutConfirm && (
				<div className='logout-modal-overlay' onClick={cancelLogout}>
					<div className='logout-modal-content' onClick={(e) => e.stopPropagation()}>
						<i className='bx bx-log-out-circle'></i>
						<h3>Confirm Logout</h3>
						<p>Are you sure you want to logout?</p>
						<div className='logout-modal-actions'>
							<button
								className='btn-cancel'
								onClick={cancelLogout}
							>
								Cancel
							</button>
							<button
								className='btn-confirm'
								onClick={confirmLogout}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Sidebar */}
			<div className='dashboard-sidebar'>
				<div className='sidebar-content'>
					<div className='sidebar-header'>
						<i className='bx bx-user-circle'></i>
						<h3>Dashboard</h3>
					</div>

					<nav className='sidebar-menu'>
						{menuItems.map((item) => (
							<button
								key={item.id}
								className={`menu-item ${activeTab === item.id ? "active" : ""} ${item.id === "logout" ? "logout-item" : ""}`}
								onClick={() => handleMenuClick(item.id)}
							>
								<i className={`bx ${item.icon}`}></i>
								<span>{item.label}</span>
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
					{activeTab === "meeting-rooms" && <MeetingRoomHistory />}

					{activeTab === "virtual-office" && <VirtualOfficeHistory />}

					{activeTab === "profile" && <ProfileSection />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;