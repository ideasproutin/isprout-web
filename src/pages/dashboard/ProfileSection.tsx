import React, { useState, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";

const ProfileSection: React.FC = () => {
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

	const [nameError, setNameError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [emailError, setEmailError] = useState("");

	// Log profile data when it changes
	useEffect(() => {
		console.log("[ProfileSection] Profile data updated:", profile);
	}, [profile]);

	const handleEditStart = () => {
		setEditName(profile?.fullName ?? "");
		setEditPhone(profile?.mobile ?? "");
		setNameError("");
		setPhoneError("");
		setEmailError("");
		clearMessages();
		setIsEditing(true);
	};

	const handleEditCancel = () => {
		setIsEditing(false);
		clearMessages();
	};

	const handleEditSave = async () => {
		// Validate fields before saving
		const validateName = (name: string) => {
			if (!name) return "Name is required";
			if (/^\s/.test(name)) return "Name must not start with a space";
			if (name.length > 50) return "Name must be at most 50 characters";
			if (/\d/.test(name)) return "Name must not contain numbers";
			return "";
		};

		const validatePhone = (phone: string) => {
			if (!phone) return "Phone is required";
			if (!/^\d{10}$/.test(phone)) return "Phone must be exactly 10 digits";
			return "";
		};

		const validateEmail = (email: string) => {
			if (!email) return "Email is required";
			if (email.length > 100) return "Email must be at most 100 characters";
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!re.test(email)) return "Invalid email format";
			return "";
		};

		const nameErr = validateName(editName);
		const phoneErr = validatePhone(editPhone);
		const emailErr = validateEmail(profile?.email ?? "");

		setNameError(nameErr);
		setPhoneError(phoneErr);
		setEmailError(emailErr);

		if (nameErr || phoneErr || emailErr) return;

		const ok = await updateProfileAction({ fullName: editName, mobile: editPhone });
		if (ok) setIsEditing(false);
	};

	return (
		<div className='content-section' style={{ fontFamily: "Outfit, sans-serif" }}>
			{isProfileLoading ? (
				<div className='empty-state'>
					<i className='bx bx-loader-alt bx-spin'></i>
					<p>Loading profile…</p>
				</div>
			) : (
				<div style={{ 
					maxWidth: "900px", 
					margin: "0 auto",
					background: "#fff",
					borderRadius: "20px",
					overflow: "hidden",
					boxShadow: "0 4px 24px rgba(0,39,92,0.08)",
				}}>
					{/* Header Section with Gradient */}
					<div style={{
						background: "linear-gradient(135deg, #00275c 0%, #004494 100%)",
						padding: "30px",
						position: "relative",
						overflow: "hidden",
					}}>
						<div style={{
							position: "absolute",
							top: "-50px",
							right: "-50px",
							width: "200px",
							height: "200px",
							background: "rgba(255,255,255,0.1)",
							borderRadius: "50%",
						}} />
						<div style={{
							position: "absolute",
							bottom: "-30px",
							left: "-30px",
							width: "150px",
							height: "150px",
							background: "rgba(255,255,255,0.08)",
							borderRadius: "50%",
						}} />
						
						<div style={{ display: "flex", alignItems: "center", gap: "24px", position: "relative", zIndex: 1 }}>
							<div style={{
								width: "90px",
								height: "90px",
								borderRadius: "50%",
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(10px)",
								border: "3px solid rgba(255,255,255,0.3)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "42px",
								color: "#fff",
								flexShrink: 0,
							}}>
								<i className='bx bxs-user'></i>
							</div>
							<div>
								<h2 style={{
									fontSize: "28px",
									fontWeight: 700,
									color: "#fff",
									margin: "0 0 8px 0",
									letterSpacing: "-0.5px",
								}}>
									{profile?.fullName || "Your Profile"}
								</h2>
								<div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>
									<i className='bx bx-calendar' style={{ fontSize: "16px" }}></i>
									<span>
										Member since {profile?.createdAt
											? new Date(profile.createdAt).toLocaleDateString("en-IN", {
												month: "long",
												year: "numeric",
											})
											: "—"}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Form Content */}
					<div style={{ padding: "40px" }}>
						{isProfileError && (
							<div style={{
								padding: "14px 18px",
								background: "#fef2f2",
								border: "1px solid #fca5a5",
								borderRadius: "12px",
								marginBottom: "24px",
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}>
								<i className='bx bx-error-circle' style={{ fontSize: "20px", color: "#dc2626" }}></i>
								<span style={{ color: "#dc2626", fontSize: "14px", fontWeight: 500 }}>{profileError}</span>
							</div>
						)}
						{successMessage && (
							<div style={{
								padding: "14px 18px",
								background: "#f0fdf4",
								border: "1px solid #86efac",
								borderRadius: "12px",
								marginBottom: "24px",
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}>
								<i className='bx bx-check-circle' style={{ fontSize: "20px", color: "#16a34a" }}></i>
								<span style={{ color: "#16a34a", fontSize: "14px", fontWeight: 500 }}>{successMessage}</span>
							</div>
						)}

						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
							{/* Name Field */}
							<div style={{ gridColumn: "span 2" }}>
								<label style={{
									display: "block",
									fontSize: "13px",
									fontWeight: 600,
									color: "#64748b",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.5px",
								}}>
									<i className='bx bx-user' style={{ marginRight: "6px", fontSize: "14px" }}></i>
									Full Name
								</label>
								<input
									type='text'
									value={isEditing ? editName : (profile?.fullName ?? "")}
									maxLength={50}
									onChange={(e) => {
										if (isEditing) {
											let v = e.target.value.replace(/^\s+/, "");
											v = v.replace(/\d/g, "").slice(0, 50);
											setEditName(v);
											setNameError("");
										}
									}}
									disabled={!isEditing}
									placeholder="Enter your name"
									style={{
										width: "100%",
										padding: "16px 18px",
										border: isEditing ? "2px solid #cbd5e1" : "2px solid #f1f5f9",
										borderRadius: "12px",
										fontSize: "16px",
										color: "#1e293b",
										fontFamily: "Outfit, sans-serif",
										background: isEditing ? "#fff" : "#f8fafc",
										transition: "all 0.3s ease",
										outline: "none",
									}}
									onFocus={(e) => isEditing && (e.target.style.borderColor = "#00275c", e.target.style.boxShadow = "0 0 0 4px rgba(0,39,92,0.1)")}
									onBlur={(e) => (e.target.style.borderColor = "#cbd5e1", e.target.style.boxShadow = "none")}
								/>
								{nameError && <p className='input-error' style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
									<i className='bx bx-error-circle' style={{ fontSize: "14px" }}></i>
									{nameError}
								</p>}
							</div>

							{/* Email Field */}
							<div>
								<label style={{
									display: "block",
									fontSize: "13px",
									fontWeight: 600,
									color: "#64748b",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.5px",
								}}>
									<i className='bx bx-envelope' style={{ marginRight: "6px", fontSize: "14px" }}></i>
									Email Address
								</label>
								<input
									type='email'
									value={profile?.email ?? ""}
									maxLength={100}
									disabled={true}
									placeholder="Email address"
									style={{
										width: "100%",
										padding: "16px 18px",
										border: "2px solid #f1f5f9",
										borderRadius: "12px",
										fontSize: "16px",
										color: "#64748b",
										fontFamily: "Outfit, sans-serif",
										background: "#f8fafc",
										cursor: "not-allowed",
									}}
								/>
								{emailError && <p className='input-error' style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
									<i className='bx bx-error-circle' style={{ fontSize: "14px" }}></i>
									{emailError}
								</p>}
							</div>

							{/* Phone Field */}
							<div>
								<label style={{
									display: "block",
									fontSize: "13px",
									fontWeight: 600,
									color: "#64748b",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.5px",
								}}>
									<i className='bx bx-phone' style={{ marginRight: "6px", fontSize: "14px" }}></i>
									Phone Number
								</label>
								<input
									type='tel'
									value={isEditing ? editPhone : (profile?.mobile ?? "")}
									maxLength={10}
									onChange={(e) => {
										if (isEditing) {
											const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
											setEditPhone(digits);
											if (digits.length !== 10) {
												setPhoneError("Phone must be exactly 10 digits");
											} else {
												setPhoneError("");
											}
										}
									}}
									disabled={!isEditing}
									placeholder="Enter your phone number"
									style={{
										width: "100%",
										padding: "16px 18px",
										border: isEditing ? "2px solid #cbd5e1" : "2px solid #f1f5f9",
										borderRadius: "12px",
										fontSize: "16px",
										color: "#1e293b",
										fontFamily: "Outfit, sans-serif",
										background: isEditing ? "#fff" : "#f8fafc",
										transition: "all 0.3s ease",
										outline: "none",
									}}
									onFocus={(e) => isEditing && (e.target.style.borderColor = "#00275c", e.target.style.boxShadow = "0 0 0 4px rgba(0,39,92,0.1)")}
									onBlur={(e) => (e.target.style.borderColor = "#cbd5e1", e.target.style.boxShadow = "none")}
								/>
								{phoneError && <p className='input-error' style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
									<i className='bx bx-error-circle' style={{ fontSize: "14px" }}></i>
									{phoneError}
								</p>}
							</div>
						</div>

						{/* Action Buttons */}
						<div style={{
							display: "flex",
							gap: "12px",
							justifyContent: "flex-end",
							paddingTop: "24px",
							borderTop: "1px solid #f1f5f9",
						}}>
							{isEditing ? (
								<>
									<button
										onClick={handleEditCancel}
										disabled={isUpdating}
										style={{
											padding: "14px 32px",
											border: "2px solid #e2e8f0",
											borderRadius: "10px",
											fontSize: "15px",
											fontWeight: 600,
											cursor: isUpdating ? "not-allowed" : "pointer",
											background: "#fff",
											color: "#475569",
											fontFamily: "Outfit, sans-serif",
											transition: "all 0.3s ease",
											opacity: isUpdating ? 0.5 : 1,
										}}
										onMouseEnter={(e) => !isUpdating && (e.currentTarget.style.background = "#f8fafc", e.currentTarget.style.borderColor = "#cbd5e1")}
										onMouseLeave={(e) => (e.currentTarget.style.background = "#fff", e.currentTarget.style.borderColor = "#e2e8f0")}
									>
										Cancel
									</button>
									<button
										onClick={handleEditSave}
										disabled={isUpdating || Boolean(nameError) || Boolean(phoneError) || Boolean(emailError)}
										style={{
											padding: "14px 32px",
											border: "none",
											borderRadius: "10px",
											fontSize: "15px",
											fontWeight: 600,
											cursor: (isUpdating || nameError || phoneError || emailError) ? "not-allowed" : "pointer",
											background: "linear-gradient(135deg, #00275c 0%, #004494 100%)",
											color: "#fff",
											fontFamily: "Outfit, sans-serif",
											transition: "all 0.3s ease",
											opacity: (isUpdating || nameError || phoneError || emailError) ? 0.5 : 1,
											boxShadow: "0 4px 12px rgba(0,39,92,0.25)",
											display: "flex",
											alignItems: "center",
											gap: "8px",
										}}
										onMouseEnter={(e) => {
											if (!isUpdating && !nameError && !phoneError && !emailError) {
												e.currentTarget.style.transform = "translateY(-2px)";
												e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,39,92,0.35)";
											}
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = "translateY(0)";
											e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,39,92,0.25)";
										}}
									>
										{isUpdating ? (
											<>
												<i className='bx bx-loader-alt bx-spin'></i>
												Saving...
											</>
										) : (
											<>
												<i className='bx bx-check'></i>
												Save Changes
											</>
										)}
									</button>
								</>
							) : (
								<button
									onClick={handleEditStart}
									style={{
										padding: "14px 32px",
										border: "none",
										borderRadius: "10px",
										fontSize: "15px",
										fontWeight: 600,
										cursor: "pointer",
										background: "linear-gradient(135deg, #00275c 0%, #004494 100%)",
										color: "#fff",
										fontFamily: "Outfit, sans-serif",
										transition: "all 0.3s ease",
										boxShadow: "0 4px 12px rgba(0,39,92,0.25)",
										display: "flex",
										alignItems: "center",
										gap: "8px",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "translateY(-2px)";
										e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,39,92,0.35)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "translateY(0)";
										e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,39,92,0.25)";
									}}
								>
									<i className='bx bx-edit-alt'></i>
									Edit Profile
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileSection;
