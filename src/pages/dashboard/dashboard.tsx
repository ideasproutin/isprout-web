import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import "./dashboard.css";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("meeting-rooms");
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	// Profile
	const {
		profile,
		isLoading: isProfileLoading,
		isUpdating,
		isError: isProfileError,
		error: profileError,
		successMessage,
		updateProfileAction,
		clearMessages,
	} = useProfile();

	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState("");
	const [editPhone, setEditPhone] = useState("");

	const handleLogout = () => {
		setShowLogoutConfirm(true);
	};

	const confirmLogout = () => {
		// Clear auth state
		localStorage.removeItem("isLoggedIn");
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

	const handleEditStart = () => {
		setEditName(profile?.fullName ?? "");
		setEditPhone(profile?.mobile ?? "");
		clearMessages();
		setIsEditing(true);
	};

	const handleEditCancel = () => {
		setIsEditing(false);
		clearMessages();
	};

	const handleEditSave = async () => {
		const ok = await updateProfileAction({
			fullName: editName,
			mobile: editPhone,
		});
		if (ok) setIsEditing(false);
	};

	return (
		<div className='dashboard-wrapper'>
			{/* Logout Confirmation Modal */}
			{showLogoutConfirm && (
				<div className='logout-modal-overlay' onClick={cancelLogout}>
					<div
						className='logout-modal-content'
						onClick={(e) => e.stopPropagation()}
					>
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

								{isProfileLoading ? (
									<div className='empty-state'>
										<i className='bx bx-loader-alt bx-spin'></i>
										<p>Loading profile…</p>
									</div>
								) : (
									<div className='profile-info'>
										{isProfileError && (
											<p className='profile-error'>
												{profileError}
											</p>
										)}
										{successMessage && (
											<p className='profile-success'>
												{successMessage}
											</p>
										)}

										<div className='profile-field'>
											<label>Name</label>
											{isEditing ? (
												<input
													type='text'
													value={editName}
													onChange={(e) =>
														setEditName(
															e.target.value,
														)
													}
												/>
											) : (
												<input
													type='text'
													value={profile?.fullName ?? "—"}
													readOnly
												/>
											)}
										</div>
										<div className='profile-field'>
											<label>Email</label>
											<input
												type='email'
												value={profile?.email ?? "—"}
												readOnly
											/>
										</div>
										<div className='profile-field'>
											<label>Phone</label>
											{isEditing ? (
												<input
													type='tel'
													value={editPhone}
													onChange={(e) =>
														setEditPhone(
															e.target.value,
														)
													}
												/>
											) : (
												<input
													type='tel'
													value={
														profile?.mobile ?? "—"
													}
													readOnly
												/>
											)}
										</div>
										<div className='profile-field'>
											<label>Member Since</label>
											<input
												type='text'
												value={
													profile?.createdAt
														? new Date(
																profile.createdAt,
															).toLocaleDateString(
																"en-IN",
																{
																	month: "long",
																	year: "numeric",
																},
															)
														: "—"
												}
												readOnly
											/>
										</div>

										{isEditing ? (
											<div className='profile-actions'>
												<button
													className='edit-button'
													onClick={handleEditSave}
													disabled={isUpdating}
												>
													{isUpdating
														? "Saving…"
														: "Save Changes"}
												</button>
												<button
													className='cancel-button'
													onClick={handleEditCancel}
													disabled={isUpdating}
												>
													Cancel
												</button>
											</div>
										) : (
											<button
												className='edit-button'
												onClick={handleEditStart}
											>
												Edit Profile
											</button>
										)}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
