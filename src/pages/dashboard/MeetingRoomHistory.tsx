import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserForms } from "../../hooks/useUserForms";
import type { UserFormItem } from "../../services/userFormsApi";

const getStatusLabel = (status?: string) => {
	const normalized = (status || "CONFIRMED").toUpperCase();
	if (normalized === "APPROVED") return "CONFIRMED";
	return normalized;
};

const getStatusColors = (status?: string) => {
	const normalized = getStatusLabel(status);
	if (normalized === "PENDING") {
		return { bg: "#fff8e1", text: "#b45309" };
	}
	if (normalized === "REJECTED") {
		return { bg: "#fef2f2", text: "#dc2626" };
	}
	return { bg: "#e9f7ee", text: "#1f9d4c" };
};

const formatHistoryDate = (item: UserFormItem) => {
	if (item.bookingDate) return item.bookingDate;
	return new Date(item.createdAt * 1000).toLocaleDateString("en-GB");
};

const formatReference = (item: UserFormItem) => {
	if (item.formReferenceId?.trim()) return item.formReferenceId;
	return "MEETING";
};

const getMeetingCode = (item: UserFormItem) => {
	return item.meetingRoomCode || item.center || "Meeting Room Booking";
};

const formatAmount = (item: UserFormItem) => {
	if (!item.price) return "Cash";
	const raw = String(item.price).replace(/[^0-9.]/g, "");
	if (!raw) return "Cash";
	const amount = Number(raw);
	if (Number.isNaN(amount)) return "Cash";
	return `₹${amount}`;
};

const MeetingRoomHistory: React.FC = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError, refetch } = useUserForms("MEETING_ROOM", {
		sortColumn: "createdAt",
		sortDirection: "asc",
	});

	const items: UserFormItem[] =
		data?.data?.items ??
		((data?.data as Record<string, unknown>)?.item as UserFormItem[]) ??
		[];

	if (isLoading) {
		return (
			<div className='content-section'>
				<div className='empty-state'>
					<i
						className='bx bx-loader-alt bx-spin'
						style={{ color: "#00275c", fontSize: "60px" }}
					/>
					<p>Loading your meeting room bookings…</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='content-section'>
				<div className='empty-state'>
					<i className='bx bx-calendar-x'></i>
					<h3>No Meeting Room Bookings</h3>
					<p>You haven't booked any meeting rooms yet.</p>
					<div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
						<button className='cta-button' onClick={() => refetch()}>Retry</button>
						<button className='cta-button' onClick={() => navigate("/meeting-rooms")}>Book a Meeting Room</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='content-section'>
			<h2>
				Meeting Rooms History
			</h2>
			{items.length === 0 ? (
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
			) : (
				<>
				<div
					style={{
						overflowX: "auto",
						border: "1px solid #d1d5db",
						borderRadius: "12px",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					<table
						style={{
							width: "100%",
							borderCollapse: "collapse",
							minWidth: "900px",
						}}
					>
						<thead>
							<tr style={{ backgroundColor: "#f9fafb" }}>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Booking ID</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Meeting Room</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Date</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Time Slots</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Amount</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Payment</th>
								<th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "1px solid #d1d5db", color: "#111827", fontWeight: 600 }}>Status</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => {
								const statusLabel = getStatusLabel(item.status);
								const statusStyle = getStatusColors(item.status);
								return (
									<tr key={item._id}>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 600 }}>{formatReference(item)}</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827" }}>{getMeetingCode(item)}</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827" }}>{formatHistoryDate(item)}</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827" }}>{item.slots || "-"}</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 600 }}>{formatAmount(item)}</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb", color: "#111827" }}>Cash</td>
										<td style={{ padding: "14px 16px", borderBottom: "1px solid #e5e7eb" }}>
											<span
												style={{
													backgroundColor: statusStyle.bg,
													color: statusStyle.text,
													border: `1px solid ${statusStyle.text}40`,
													padding: "4px 12px",
													borderRadius: "999px",
													fontWeight: 600,
													fontSize: "14px",
												}}
											>
												{statusLabel}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
					<button
						onClick={() => navigate("/meeting-rooms")}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "10px 28px",
							background: "#00275c",
							color: "#fff",
							border: "none",
							borderRadius: "8px",
							fontSize: "14px",
							fontWeight: 600,
							fontFamily: "Outfit, sans-serif",
							cursor: "pointer",
						}}
						onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#003d8f"}
						onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#00275c"}
					>
						<i className="bx bx-calendar-event" style={{ fontSize: "18px" }} />
						View Meeting Rooms
					</button>
				</div>
				</>
			)}
		</div>
	);
};

export default MeetingRoomHistory;
