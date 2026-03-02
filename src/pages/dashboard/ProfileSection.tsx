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
							<p className='profile-error'>{profileError}</p>
						)}
						{successMessage && (
							<p className='profile-success'>{successMessage}</p>
						)}

						<div className='profile-field'>
							<label>Name</label>
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
							/>
							{ nameError && <p className='input-error'>{nameError}</p> }
						</div>
						<div className='profile-field'>
							<label>Email</label>
							<input
								type='email'
								value={profile?.email ?? ""}
								maxLength={100}
								disabled={true}
								placeholder="Email address"
							/>
							{ emailError && <p className='input-error'>{emailError}</p> }
						</div>
						<div className='profile-field'>
							<label>Phone</label>
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
							/>
							{ phoneError && <p className='input-error'>{phoneError}</p> }
						</div>
						<div className='profile-field'>
							<label>Member Since</label>
							<input
								type='text'
								value={
									profile?.createdAt
										? new Date(
												profile.createdAt,
											).toLocaleDateString("en-IN", {
												month: "long",
												year: "numeric",
											})
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
									disabled={isUpdating || Boolean(nameError) || Boolean(phoneError) || Boolean(emailError)}
								>
									{isUpdating ? "Saving…" : "Save Changes"}
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
	);
};

export default ProfileSection;
