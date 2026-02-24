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

	// Log profile data when it changes
	useEffect(() => {
		console.log("[ProfileSection] Profile data updated:", profile);
	}, [profile]);

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
								onChange={(e) => {
									if (isEditing) setEditName(e.target.value);
								}}
								disabled={!isEditing}
								placeholder="Enter your name"
							/>
						</div>
						<div className='profile-field'>
							<label>Email</label>
							<input
								type='email'
								value={profile?.email ?? ""}
								disabled={true}
								placeholder="Email address"
							/>
						</div>
						<div className='profile-field'>
							<label>Phone</label>
							<input
								type='tel'
								value={isEditing ? editPhone : (profile?.mobile ?? "")}
								onChange={(e) => {
									if (isEditing) setEditPhone(e.target.value);
								}}
								disabled={!isEditing}
								placeholder="Enter your phone number"
							/>
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
									disabled={isUpdating}
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
