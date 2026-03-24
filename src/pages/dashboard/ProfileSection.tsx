import React, { useState, useEffect, useRef } from "react";
import { useProfile } from "../../hooks/useProfile";

const ProfileSection: React.FC = () => {
	// Profile
	const {
		profile,
		isLoading: isProfileLoading,
		isUpdating,
		isUploadingPicture,
		isError: isProfileError,
		error: profileError,
		successMessage,
		updateProfileAction,
		uploadPictureAction,
		clearMessages,
	} = useProfile();

	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState("");
	const [editPhone, setEditPhone] = useState("");
	const [stagedPictureFile, setStagedPictureFile] = useState<File | null>(null);
	const [stagedPicturePreview, setStagedPicturePreview] = useState<string | null>(null);
	const [avatarHovered, setAvatarHovered] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [nameError, setNameError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [emailError, setEmailError] = useState("");

	// Log profile data when it changes
	useEffect(() => {
		console.log("[ProfileSection] Profile data updated:", profile);
	}, [profile]);

	// Revoke object URLs to avoid memory leaks when staging new previews.
	useEffect(() => {
		return () => {
			if (stagedPicturePreview) {
				URL.revokeObjectURL(stagedPicturePreview);
			}
		};
	}, [stagedPicturePreview]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) return;
		if (file.size > 5 * 1024 * 1024) return;

		if (stagedPicturePreview) {
			URL.revokeObjectURL(stagedPicturePreview);
		}
		setStagedPictureFile(file);
		setStagedPicturePreview(URL.createObjectURL(file));
		clearMessages();

		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleEditStart = () => {
		setEditName(profile?.fullName ?? "");
		setEditPhone(profile?.mobile ?? "");
		setNameError("");
		setPhoneError("");
		setEmailError("");
		setStagedPictureFile(null);
		if (stagedPicturePreview) {
			URL.revokeObjectURL(stagedPicturePreview);
			setStagedPicturePreview(null);
		}
		clearMessages();
		setIsEditing(true);
	};

	const handleEditCancel = () => {
		setStagedPictureFile(null);
		if (stagedPicturePreview) {
			URL.revokeObjectURL(stagedPicturePreview);
			setStagedPicturePreview(null);
		}
		if (fileInputRef.current) fileInputRef.current.value = "";
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

		if (stagedPictureFile) {
			const uploaded = await uploadPictureAction(stagedPictureFile);
			if (!uploaded) return;
		}

		const ok = await updateProfileAction({ fullName: editName, mobile: editPhone });
		if (ok) {
			setStagedPictureFile(null);
			if (stagedPicturePreview) {
				URL.revokeObjectURL(stagedPicturePreview);
				setStagedPicturePreview(null);
			}
			setIsEditing(false);
		}
	};

	const avatarSource = isEditing && stagedPicturePreview
		? stagedPicturePreview
		: profile?.profilePicture;
	const isSaving = isUpdating || isUploadingPicture;

	return (
		<div className='content-section' style={{ fontFamily: "Outfit, sans-serif" }}>
			{isProfileLoading ? (
				<div className='empty-state'>
					<i className='bx bx-loader-alt bx-spin'></i>
					<p>Loading profile…</p>
				</div>
			) : (
				<div className='profile-container'>
					{/* Header Section with Gradient */}
					<div className='profile-header'>
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
						
						<div className='profile-header-content'>
						{/* Clickable avatar */}
						<label
							htmlFor={isEditing ? "profile-pic-input" : undefined}
							onMouseEnter={() => isEditing && setAvatarHovered(true)}
							onMouseLeave={() => setAvatarHovered(false)}
							style={{
								width: "90px",
								height: "90px",
								borderRadius: "50%",
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(10px)",
								border: `3px solid ${isEditing && avatarHovered && !isUploadingPicture ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
								cursor: !isEditing ? "default" : isUploadingPicture ? "wait" : "pointer",
								position: "relative",
								overflow: "hidden",
								transition: "border-color 0.2s",
							}}>
							{avatarSource ? (
								<img
									src={avatarSource}
									alt="Profile"
									style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
								/>
							) : (
								<i className='bx bxs-user' style={{ fontSize: "42px", color: "#fff" }}></i>
							)}
							{isEditing && (avatarHovered || isUploadingPicture) && (
								<div style={{
									position: "absolute", inset: 0,
									background: "rgba(0,0,0,0.45)",
									display: "flex", flexDirection: "column",
									alignItems: "center", justifyContent: "center",
									gap: "4px", borderRadius: "50%",
								}}>
									{isUploadingPicture ? (
										<i className='bx bx-loader-alt bx-spin' style={{ fontSize: "22px", color: "#fff" }}></i>
									) : (
										<>
											<i className='bx bx-camera' style={{ fontSize: "22px", color: "#fff" }}></i>
											<span style={{ fontSize: "9px", color: "#fff", fontWeight: 600, letterSpacing: "0.3px" }}>UPLOAD</span>
										</>
									)}
								</div>
							)}
						</label>
						<input ref={fileInputRef} id="profile-pic-input" type="file" accept="image/*" disabled={!isEditing || isUploadingPicture} style={{ display: "none" }} onChange={handleFileChange} />
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
								<div className='member-info' style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>
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
					<div className='profile-form-content'>
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

						<div className='profile-form-grid'>
							{/* Name Field */}
							<div className='profile-field-full'>
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
						</div>

						{/* Action Buttons */}
						<div className='profile-actions'>
							{isEditing ? (
								<>
									<button
										onClick={handleEditCancel}
										disabled={isSaving}
										style={{
											padding: "14px 32px",
											border: "2px solid #e2e8f0",
											borderRadius: "10px",
											fontSize: "15px",
											fontWeight: 600,
											cursor: isSaving ? "not-allowed" : "pointer",
											background: "#fff",
											color: "#475569",
											fontFamily: "Outfit, sans-serif",
											transition: "all 0.3s ease",
											opacity: isSaving ? 0.5 : 1,
										}}
										onMouseEnter={(e) => !isSaving && (e.currentTarget.style.background = "#f8fafc", e.currentTarget.style.borderColor = "#cbd5e1")}
										onMouseLeave={(e) => (e.currentTarget.style.background = "#fff", e.currentTarget.style.borderColor = "#e2e8f0")}
									>
										Cancel
									</button>
									<button
										onClick={handleEditSave}
										disabled={isSaving || Boolean(nameError) || Boolean(phoneError) || Boolean(emailError)}
										style={{
											padding: "14px 32px",
											border: "none",
											borderRadius: "10px",
											fontSize: "15px",
											fontWeight: 600,
											cursor: (isSaving || nameError || phoneError || emailError) ? "not-allowed" : "pointer",
											background: "linear-gradient(135deg, #00275c 0%, #004494 100%)",
											color: "#fff",
											fontFamily: "Outfit, sans-serif",
											transition: "all 0.3s ease",
											opacity: (isSaving || nameError || phoneError || emailError) ? 0.5 : 1,
											boxShadow: "0 4px 12px rgba(0,39,92,0.25)",
											display: "flex",
											alignItems: "center",
											gap: "8px",
										}}
										onMouseEnter={(e) => {
											if (!isSaving && !nameError && !phoneError && !emailError) {
												e.currentTarget.style.transform = "translateY(-2px)";
												e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,39,92,0.35)";
											}
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = "translateY(0)";
											e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,39,92,0.25)";
										}}
									>
										{isSaving ? (
											<>
												<i className='bx bx-loader-alt bx-spin'></i>
												{isUploadingPicture ? "Uploading photo..." : "Saving..."}
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