import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserForms } from "../../hooks/useUserForms";
import type { UserFormItem } from "../../services/userFormsApi";
import { useCancelBooking } from "../../hooks/useCancelBooking";
import { useUserTransactions } from "../../hooks/useUserTransaction";

const getStatusLabel = (status?: string) => {
	const normalized = (status || "CONFIRMED").toUpperCase();
	if (normalized === "APPROVED" || normalized === "CONFIRMED") return "CONFIRMED";
	if (normalized === "CANCELLED") return "CANCELLED";
	if (normalized === "PENDING") return "PENDING";
	return normalized;
};

const getStatusColors = (status?: string) => {
	const normalized = getStatusLabel(status);
	if (normalized === "PENDING") {
		return { bg: "#fff3cd", text: "#856404" };
	}
	if (normalized === "REJECTED" || normalized === "CANCELLED") {
		return { bg: "#f8d7da", text: "#721c24" };
	}
	// CONFIRMED
	return { bg: "#d4edda", text: "#155724" };
};

const formatHistoryDate = (item: UserFormItem) => {
	// Format as "Mar 09, 2026" to match admin panel
	if (item.bookingDate) {
		// Input format: "DD-MM-YYYY"
		const parts = item.bookingDate.split('-');
		if (parts.length === 3) {
			const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
			return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
		}
		return item.bookingDate;
	}
	if (item.createdAt) {
		const timestamp = typeof item.createdAt === 'number' ? item.createdAt : Date.parse(item.createdAt as any) / 1000;
		return new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	}
	return "-";
};

const formatReference = (item: UserFormItem) => {
	// API returns bookingReferenceId (e.g., "ISP2593")
	return item.bookingReferenceId || item.formReferenceId || "N/A";
};

const getMeetingCode = (item: UserFormItem) => {
	return item.meetingRoomName || item.meetingRoomCode || item.center || "Meeting Room";
};

const formatAmount = (item: UserFormItem) => {
	// API returns totalAmount as number
	if (item.totalAmount) {
		return `₹${item.totalAmount}`;
	}
	if (item.price) {
		const raw = String(item.price).replace(/[^0-9.]/g, "");
		if (raw) {
			const amount = Number(raw);
			if (!Number.isNaN(amount)) return `₹${amount}`;
		}
	}
	return "₹0";
};

const formatSlots = (item: UserFormItem) => {
	// API returns slots as array of objects with startTime and endTime
	if (item.slots) {
		if (typeof item.slots === 'string') {
			return item.slots;
		}
		if (Array.isArray(item.slots) && item.slots.length > 0) {
			return item.slots.map((slot: any) => `${slot.startTime}-${slot.endTime}`).join(", ");
		}
	}
	return "-";
};

const MeetingRoomHistory: React.FC = () => {
	const navigate = useNavigate();
	const [selectedBooking, setSelectedBooking] = React.useState<UserFormItem | null>(null);
	const [showCancelDialog, setShowCancelDialog] = React.useState(false);
	const [cancellationReason, setCancellationReason] = React.useState("");
	
	const { data, isLoading, isError, refetch } = useUserForms("MEETING_ROOM", {
		sortColumn: "createdAt",
		sortDirection: "desc",
	});

	// Fetch transaction data for the selected booking only
	const selectedBookingRefId = selectedBooking ? formatReference(selectedBooking) : undefined;
	const { data: transactionsData, error: transactionsError } = useUserTransactions(selectedBookingRefId);

	console.log("[MeetingRoomHistory] Data:", { data, items: data?.data?.items, count: data?.data?.items?.length });
	if (selectedBookingRefId) {
		console.log("[MeetingRoomHistory] Fetching transaction for refId:", selectedBookingRefId);
		console.log("[MeetingRoomHistory] Transaction data:", transactionsData);
		if (transactionsError) {
			console.error("[MeetingRoomHistory] Transaction error:", transactionsError);
		}
	}

	// Get all transactions for the selected booking
	const getTransactionsForBooking = () => {
		if (!transactionsData?.data) return [];
		const transactions = transactionsData.data.items || transactionsData.data.item || [];
		
		// Sort transactions: debit first (original booking), then credit (refund/cancellation)
		return transactions.sort((a, b) => {
			// Sort by transaction mode: debit before credit
			if (a.transactionMode === 'debit' && b.transactionMode === 'credit') return -1;
			if (a.transactionMode === 'credit' && b.transactionMode === 'debit') return 1;
			
			// If same mode, sort by date (oldest first)
			const aTime = typeof a.createdAt === 'number' ? a.createdAt : parseInt(String(a.createdAt), 10);
			const bTime = typeof b.createdAt === 'number' ? b.createdAt : parseInt(String(b.createdAt), 10);
			return aTime - bTime;
		});
	};

	// Calculate total amount from transactions
	const calculateTotalAmount = () => {
		const transactions = getTransactionsForBooking();
		if (transactions.length === 0 && selectedBooking) {
			return formatAmount(selectedBooking);
		}
		if (transactions.length === 0) return "₹0";
		
		const total = transactions.reduce((sum, t) => {
			const amount = Number(t.amount) || 0;
			return t.transactionMode === 'debit' ? sum + amount : sum - amount;
		}, 0);
		
		return `₹${total}`;
	};

	const cancelBookingMutation = useCancelBooking({
		onSuccess: (data) => {
			console.log("[MeetingRoomHistory] Cancel booking SUCCESS");
			console.log("[MeetingRoomHistory] Success response:", data);
			// Close dialogs and reset state
			setShowCancelDialog(false);
			setSelectedBooking(null);
			setCancellationReason("");
		},
		onError: (error) => {
			console.error("[MeetingRoomHistory] Cancel booking ERROR");
			console.error("[MeetingRoomHistory] Error details:", error);
			// Error is already handled by the hook with toast
		},
	});

	const handleCancelBooking = async () => {
		if (!selectedBooking || !cancellationReason.trim()) {
			alert("Please provide a reason for cancellation");
			return;
		}

		// Use MongoDB _id for the API call, not the bookingReferenceId
		const bookingId = selectedBooking._id;
		const bookingRefId = formatReference(selectedBooking);
		
		console.log("========== CANCEL BOOKING INITIATED ==========");
		console.log("[handleCancelBooking] Selected Booking:", selectedBooking);
		console.log("[handleCancelBooking] MongoDB _id:", bookingId);
		console.log("[handleCancelBooking] Reference ID (ISP):", bookingRefId);
		console.log("[handleCancelBooking] Cancellation Reason:", cancellationReason.trim());
		console.log("[handleCancelBooking] Booking Status:", selectedBooking.bookingStatus || selectedBooking.status);

		cancelBookingMutation.mutate({
			refId: bookingId,
			cancellationReason: cancellationReason.trim(),
		});
	};

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
						background: "#ffffff",
						borderRadius: "12px",
						boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
					}} 
				>
					<table
						style={{
							width: "100%",
							borderCollapse: "separate",
							borderSpacing: 0,
							minWidth: "900px",
							fontFamily: "Outfit, sans-serif",
						}}
					>
						<thead>
							<tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Booking ID</th>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Meeting Room</th>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Date</th>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Time Slots</th>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Amount</th>

								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
								<th style={{ padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px" }}>Action</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => {
								// API returns bookingStatus (not status)
								const statusLabel = getStatusLabel(item.bookingStatus || item.status);
								const statusStyle = getStatusColors(item.bookingStatus || item.status);
								return (
								<tr 
									key={item._id} 
									onClick={() => setSelectedBooking(item)}
									style={{ 
										borderBottom: "1px solid #f1f3f5", 
										cursor: "pointer",
										transition: "background-color 0.2s ease"
									}}
									onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
									onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
								>
										<td style={{ padding: "16px", fontSize: "14px", color: "#212529", fontWeight: 600 }}>{formatReference(item)}</td>
										<td style={{ padding: "16px", fontSize: "14px", color: "#495057" }}>{getMeetingCode(item)}</td>
										<td style={{ padding: "16px", fontSize: "14px", color: "#495057" }}>{formatHistoryDate(item)}</td>
										<td style={{ padding: "16px", fontSize: "14px", color: "#495057" }}>{formatSlots(item)}</td>
										<td style={{ padding: "16px", fontSize: "14px", color: "#212529", fontWeight: 600 }}>{formatAmount(item)}</td>

										<td style={{ padding: "16px" }}>
											<span
												style={{
													display: "inline-block",
													padding: "6px 16px",
													backgroundColor: statusStyle.bg,
													color: statusStyle.text,
													borderRadius: "20px",
													fontSize: "13px",
													fontWeight: 600,
													textTransform: "capitalize",
												}}
											>
												{statusLabel}
											</span>
										</td>
										<td style={{ padding: "16px" }}>
											<button
												onClick={() => setSelectedBooking(item)}
												style={{
													background: "transparent",
													border: "none",
													color: "#00275c",
													fontSize: "14px",
													fontWeight: 600,
													cursor: "pointer",
													textDecoration: "underline",
													fontFamily: "Outfit, sans-serif",
												}}
											>
												View More
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
					<button
						onClick={() => navigate("/meeting-rooms")}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "12px 32px",
							background: "#00275c",
							color: "#fff",
							border: "none",
							borderRadius: "8px",
							fontSize: "15px",
							fontWeight: 600,
							fontFamily: "Outfit, sans-serif",
							cursor: "pointer",
							transition: "background 0.2s",
						}}
						onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#003d8f"}
						onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#00275c"}
					>
						<i className="bx bx-calendar-plus" style={{ fontSize: "20px" }} />
						Book Another Meeting Room
					</button>
				</div>
				</>
			)}

			{/* Booking Details Modal */}
			{selectedBooking && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
						padding: "20px",
					}}
					onClick={() => setSelectedBooking(null)}
				>
					<div
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: "16px",
							maxWidth: "1000px",
							width: "100%",
							maxHeight: "90vh",
							overflow: "auto",
							position: "relative",
							fontFamily: "Outfit, sans-serif",
							padding: "32px",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
							<h2 style={{ fontSize: "24px", fontWeight: 600, color: "#333", margin: 0 }}>
								Booking Details ({formatReference(selectedBooking)})
							</h2>
							<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
								<i className="bx bx-check-circle" style={{ fontSize: "28px", color: "#155724" }} />
								<span style={{
									backgroundColor: "#FFDE00",
									padding: "8px 20px",
									borderRadius: "8px",
									fontSize: "14px",
									fontWeight: 700,
									color: "#333",
								}}>
									{getStatusLabel(selectedBooking.bookingStatus || selectedBooking.status)}
								</span>
								<button
									onClick={() => setSelectedBooking(null)}
									style={{
										background: "transparent",
										border: "none",
										fontSize: "28px",
										cursor: "pointer",
										color: "#666",
										padding: 0,
										marginLeft: "8px",
									}}
								>
									×
								</button>
							</div>
						</div>

						{/* Content Grid */}
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
							{/* Meeting Room Details */}
							<div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "24px" }}>
								<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
									<i className="bx bx-map" style={{ fontSize: "24px", color: "#555" }} />
									<h3 style={{ fontSize: "18px", fontWeight: 600, color: "#333", margin: 0 }}>Meeting Room Details</h3>
								</div>
								<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Room Name:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right" }}>
											{selectedBooking.meetingRoomName || "N/A"}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Room Code:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right" }}>
											{selectedBooking.meetingRoomCode || getMeetingCode(selectedBooking)}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Seating:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
											{selectedBooking.seating || "N/A"}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Capacity:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>N/A</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Location:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right" }}>
											{selectedBooking.cityName || selectedBooking.centerName || "N/A"}
										</span>
									</div>
									
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Date:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
											{formatHistoryDate(selectedBooking)}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Time:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
											{formatSlots(selectedBooking)}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Duration:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
											{selectedBooking.totalDurationInMinutes ? `${selectedBooking.totalDurationInMinutes} minutes` : "N/A"}
										</span>
									</div>
								</div>
							</div>

							{/* User & Status Information */}
							<div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "24px" }}>
								<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
									<i className="bx bx-user" style={{ fontSize: "24px", color: "#555" }} />
									<h3 style={{ fontSize: "18px", fontWeight: 600, color: "#333", margin: 0 }}>User & Status Information</h3>
								</div>
								<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Name:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right" }}>
											{selectedBooking.fullName || selectedBooking.userName || "N/A"}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Email:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right", wordBreak: "break-all" }}>
											{selectedBooking.email || selectedBooking.userEmail || "N/A"}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Company:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500, textAlign: "right" }}>
											{selectedBooking.companyName || "N/A"}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Booking ID:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 600 }}>
											{formatReference(selectedBooking)}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Meeting Status:</span>
										<span style={{ color: "#155724", fontSize: "14px", fontWeight: 600 }}>
											{getStatusLabel(selectedBooking.bookingStatus || selectedBooking.status)}
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Check-in Status:</span>
										<span style={{ color: "#ff5722", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
											<i className="bx bx-x-circle" style={{ fontSize: "16px" }} />
											Not Checked In
										</span>
									</div>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<span style={{ color: "#666", fontSize: "14px" }}>Created:</span>
										<span style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}>
											{selectedBooking.createdAt ? new Date(
												typeof selectedBooking.createdAt === 'number' 
													? selectedBooking.createdAt * 1000 
													: selectedBooking.createdAt
											).toLocaleString('en-US', {
												month: 'short',
												day: '2-digit',
												year: 'numeric',
												hour: '2-digit',
												minute: '2-digit'
											}) : "N/A"}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Payment Information */}
						<div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
						<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
							<i className="bx bx-credit-card" style={{ fontSize: "24px", color: "#555" }} />
							<h3 style={{ fontSize: "18px", fontWeight: 600, color: "#333", margin: 0 }}>Payment Summary</h3>
						</div>
						<table style={{
							width: "100%",
							borderCollapse: "separate",
							borderSpacing: 0,
							fontFamily: "Outfit, sans-serif",
							border: "1px solid #e9ecef",
							borderRadius: "8px",
							overflow: "hidden"
						}}>
							<tbody>
								<tr style={{ borderBottom: "1px solid #f1f3f5" }}>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#666", fontWeight: 500, backgroundColor: "#f8f9fa", width: "40%" }}>Total Amount</td>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#333", fontWeight: 600 }}>
										{calculateTotalAmount()}
									</td>
								</tr>
								<tr style={{ borderBottom: "1px solid #f1f3f5" }}>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#666", fontWeight: 500, backgroundColor: "#f8f9fa" }}>Booking Date</td>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#333", fontWeight: 600 }}>
										{selectedBooking.bookingDate || "N/A"}
									</td>
								</tr>
								<tr>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#666", fontWeight: 500, backgroundColor: "#f8f9fa" }}>Booking ID</td>
									<td style={{ padding: "12px 16px", fontSize: "14px", color: "#333", fontWeight: 600 }}>
										{formatReference(selectedBooking)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Transactions Table */}
					{(() => {
						const transactions = getTransactionsForBooking();
						if (transactions.length === 0) return null;

						return (
							<div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
								<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
									<i className="bx bx-receipt" style={{ fontSize: "24px", color: "#555" }} />
									<h3 style={{ fontSize: "18px", fontWeight: 600, color: "#333", margin: 0 }}>Transactions</h3>
								</div>
								<div style={{ overflowX: "auto" }}>
									<table style={{
										width: "100%",
										borderCollapse: "separate",
										borderSpacing: 0,
										fontFamily: "Outfit, sans-serif",
										border: "1px solid #e9ecef",
										borderRadius: "8px",
										overflow: "hidden"
									}}>
										<thead>
											<tr style={{ backgroundColor: "#f8f9fa" }}>
												<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Type</th>
								<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Mode</th>
												<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Amount</th>
												<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Description</th>
												<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Status</th>
												<th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#495057", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e9ecef" }}>Date</th>
											</tr>
										</thead>
										<tbody>
											{transactions.map((transaction, index) => {
												const isDebit = transaction.transactionMode === 'debit';
												const statusColor = transaction.isActive ? "#48bb78" : "#cbd5e0";
												
												return (
													<tr key={transaction._id || index} style={{ borderBottom: index < transactions.length - 1 ? "1px solid #f1f3f5" : "none" }}>
														<td style={{ padding: "12px 16px", fontSize: "14px", color: "#495057" }}>
															<span style={{
																display: "inline-block",
																padding: "4px 12px",
																backgroundColor: isDebit ? "#fee" : "#efe",
																color: isDebit ? "#c33" : "#2a4",
																borderRadius: "6px",
																fontSize: "13px",
																fontWeight: 600,
																textTransform: "uppercase"
															}}>
																{transaction.transactionType || "N/A"}
															</span>
														</td>
													<td style={{ padding: "12px 16px", fontSize: "14px", color: "#495057", textTransform: "capitalize", fontWeight: 600 }}>
														<span style={{ color: isDebit ? "#e53e3e" : "#38a169" }}>
															{transaction.transactionMode || "N/A"}
															</span>
														</td>
														<td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: isDebit ? "#e53e3e" : "#38a169" }}>
															{isDebit ? "- " : "+ "}₹{transaction.amount || "0"}
														</td>
														<td style={{ padding: "12px 16px", fontSize: "14px", color: "#495057" }}>
															{transaction.description || "N/A"}
														</td>
														<td style={{ padding: "12px 16px", fontSize: "14px" }}>
															<span style={{
																display: "inline-flex",
																alignItems: "center",
																gap: "4px",
																color: statusColor,
																fontWeight: 600,
																fontSize: "13px"
															}}>
																<i className={`bx ${transaction.isActive ? 'bx-check-circle' : 'bx-x-circle'}`} style={{ fontSize: "16px" }} />
																{transaction.isActive ? "Active" : "Inactive"}
															</span>
														</td>
														<td style={{ padding: "12px 16px", fontSize: "14px", color: "#495057" }}>
															{transaction.createdAt ? new Date(
																typeof transaction.createdAt === 'number' 
																	? transaction.createdAt * 1000 
																	: transaction.createdAt
															).toLocaleString('en-US', {
																month: 'short',
																day: '2-digit',
																year: 'numeric',
																hour: '2-digit',
																minute: '2-digit'
															}) : "N/A"}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						);
					})()}

					{/* Action Buttons */}
					<div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
						{/* Only show Check In button if booking is not cancelled */}
						{getStatusLabel(selectedBooking.bookingStatus || selectedBooking.status) !== "CANCELLED" && (
							<button
								style={{									display: "inline-flex",
										alignItems: "center",
										gap: "8px",
										padding: "12px 24px",
										backgroundColor: "#48bb78",
										color: "#fff",
										border: "none",
										borderRadius: "8px",
										fontSize: "14px",
										fontWeight: 600,
										cursor: "pointer",
									}}
								>
									<i className="bx bx-check" style={{ fontSize: "18px" }} />
									Check In
								</button>
						)}
						{/* Only show Cancel button if booking is not already cancelled */}
						{getStatusLabel(selectedBooking.bookingStatus || selectedBooking.status) !== "CANCELLED" && (
								<button
									onClick={() => setShowCancelDialog(true)}
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "8px",
										padding: "12px 24px",
										backgroundColor: "#f56565",
										color: "#fff",
										border: "none",
										borderRadius: "8px",
										fontSize: "14px",
										fontWeight: 600,
										cursor: "pointer",
									}}
								>
									<i className="bx bx-x-circle" style={{ fontSize: "18px" }} />
									Cancel Booking
								</button>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Cancel Booking Confirmation Dialog */}
			{showCancelDialog && selectedBooking && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1100,
						padding: "20px",
					}}
					onClick={() => {
						if (!cancelBookingMutation.isPending) {
							setShowCancelDialog(false);
							setCancellationReason("");
						}
					}}
				>
					<div
						style={{
							backgroundColor: "#fff",
							borderRadius: "12px",
							maxWidth: "560px",
							width: "100%",
							fontFamily: "Outfit, sans-serif",
							padding: "32px",
							position: "relative",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
							<i className="bx bx-error-circle" style={{ fontSize: "28px", color: "#dc2626" }} />
							<h2 style={{ fontSize: "22px", fontWeight: 600, color: "#dc2626", margin: 0 }}>
								Cancel Booking
							</h2>
						</div>

						{/* Message */}
						<p style={{ fontSize: "15px", color: "#555", marginBottom: "24px", marginTop: 0 }}>
							Are you sure you want to cancel this booking?
						</p>

						{/* Reason Textarea */}
						<div style={{ marginBottom: "24px" }}>
							<label style={{ 
								display: "block", 
								fontSize: "14px", 
								fontWeight: 600, 
								color: "#333", 
								marginBottom: "8px" 
							}}>
								Reason for Cancellation <span style={{ color: "#dc2626" }}>*</span>
							</label>
							<textarea
								value={cancellationReason}
								onChange={(e) => setCancellationReason(e.target.value)}
								placeholder="Please provide a reason for cancellation"
								disabled={cancelBookingMutation.isPending}
								style={{
									width: "100%",
									minHeight: "120px",
									padding: "12px",
									border: "2px solid #FFDE00",
									borderRadius: "8px",
									fontSize: "14px",
									fontFamily: "Outfit, sans-serif",
									resize: "vertical",
									outline: "none",
									boxSizing: "border-box",
								}}
							/>
						</div>

						{/* Action Buttons */}
						<div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
							<button
								onClick={() => {
									setShowCancelDialog(false);
									setCancellationReason("");
								}}
								disabled={cancelBookingMutation.isPending}
								style={{
									padding: "12px 24px",
									backgroundColor: "transparent",
									color: "#333",
									border: "none",
									borderRadius: "8px",
									fontSize: "15px",
									fontWeight: 600,
									cursor: cancelBookingMutation.isPending ? "not-allowed" : "pointer",
									fontFamily: "Outfit, sans-serif",
									opacity: cancelBookingMutation.isPending ? 0.5 : 1,
								}}
							>
								No, Keep Booking
							</button>
							<button
								onClick={handleCancelBooking}
								disabled={cancelBookingMutation.isPending || !cancellationReason.trim()}
								style={{
									padding: "12px 24px",
									backgroundColor: !cancellationReason.trim() ? "#fca5a5" : "#f87171",
									color: "#fff",
									border: "none",
									borderRadius: "8px",
									fontSize: "15px",
									fontWeight: 600,
									cursor: (!cancellationReason.trim() || cancelBookingMutation.isPending) ? "not-allowed" : "pointer",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								{cancelBookingMutation.isPending ? "Cancelling..." : "Yes, Cancel Booking"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MeetingRoomHistory;
