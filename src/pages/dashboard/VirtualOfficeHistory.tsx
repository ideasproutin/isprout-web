import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserForms } from "../../hooks/useUserForms";
import type { UserFormItem } from "../../services/userFormsApi";

const formatDate = (ts: number) =>
	new Date(ts * 1000).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const STATUS_MAP: Record<string, { bg: string; color: string; border: string }> = {
	PENDING:  { bg: "#fffbeb", color: "#b45309", border: "#fcd34d" },
	REVIEWED: { bg: "#eff6ff", color: "#1d4ed8", border: "#93c5fd" },
	APPROVED: { bg: "#f0fdf4", color: "#15803d", border: "#86efac" },
	REJECTED: { bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5" },
};

const InfoChip: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
	<div style={{
		display: "flex",
		flexDirection: "column",
		gap: "4px",
		minWidth: 0,
	}}>
		<span style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", fontWeight: 600 }}>
			{label}
		</span>
		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<i className={`bx ${icon}`} style={{ fontSize: "16px", color: "#00275c", flexShrink: 0 }} />
			<span style={{ fontSize: "15px", color: "#1e293b", fontWeight: 600, wordBreak: "break-word" }}>{value}</span>
		</div>
	</div>
);

const Divider = () => (
	<div style={{ width: "1px", background: "#e5e7eb", alignSelf: "stretch", flexShrink: 0 }} />
);

/* ── main ── */
const VirtualOfficeHistory: React.FC = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useUserForms("VIRTUAL_OFFICE");

	const items: UserFormItem[] =
		data?.data?.items ?? (data?.data as Record<string, unknown>)?.["item"] as UserFormItem[] ?? [];
	const total = data?.pagination?.total ?? items.length;

	if (isLoading) {
		return (
			<div className="content-section">
				<div className="empty-state">
					<i className="bx bx-loader-alt bx-spin" style={{ color: "#00275c", fontSize: "60px" }} />
					<p>Loading your virtual office submissions…</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="content-section">
				<div className="empty-state">
					<i className="bx bx-error-circle" style={{ color: "#e74c3c" }} />
					<h3>Something went wrong</h3>
					<p>Unable to load your virtual office history. Please try again later.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="content-section" style={{ fontFamily: "Outfit, sans-serif" }}>
			{/* header */}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
				<h2 style={{ color: "#00275c", fontSize: "22px", fontWeight: 700, margin: 0 }}>
					Virtual Office History
				</h2>
				{items.length > 0 && (
					<span style={{ fontSize: "14px", color: "#6b7280", background: "#f3f4f6", padding: "6px 16px", borderRadius: "20px" }}>
						{total} submission{total !== 1 ? "s" : ""}
					</span>
				)}
			</div>

			{/* cards */}
				{items.length === 0 ? (
					<div style={{ textAlign: "center", padding: "60px 20px" }}>
						<i className="bx bx-building-house" style={{ fontSize: "72px", color: "#d1d5db" }} />
						<p style={{ color: "#9ca3af", fontSize: "18px", margin: "16px 0 28px" }}>No submissions found</p>
					<button className="cta-button" onClick={() => navigate("/virtual-office")}>
						Explore Virtual Offices
					</button>
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					{items.map((item) => {
						const statusKey = (item.status ?? "PENDING").toUpperCase();
						const statusStyle = STATUS_MAP[statusKey] ?? STATUS_MAP.PENDING;

						return (
							<div key={item._id} style={{
								background: "#fff",
								borderRadius: "14px",
								border: "1px solid #e5e7eb",
								overflow: "hidden",
								boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
								transition: "box-shadow 0.2s",
							}}
								onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,39,92,0.10)"}
								onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"}
							>
								{/* card top bar */}
								<div style={{
									background: "linear-gradient(135deg, #00275c 0%, #003d8f 100%)",
									padding: "16px 22px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									flexWrap: "wrap",
									gap: "10px",
								}}>
									<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
										<div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "6px 8px", display: "flex", alignItems: "center" }}>
											<i className="bx bx-buildings" style={{ fontSize: "18px", color: "#fff" }} />
										</div>
										<div>
											<p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.6px", textTransform: "uppercase" }}>Virtual Office</p>
											<p style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#fff" }}>
												{item.formReferenceId ?? "—"}
											</p>
										</div>
									</div>
									<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
										<span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>
											<i className="bx bx-calendar" style={{ marginRight: "4px" }} />
											{formatDate(item.createdAt)}
										</span>
										<span style={{
											background: statusStyle.bg,
											color: statusStyle.color,
											border: `1px solid ${statusStyle.border}`,
											fontSize: "13px",
											fontWeight: 700,
											padding: "6px 14px",
											borderRadius: "20px",
											letterSpacing: "0.4px",
										}}>
											{statusKey}
										</span>
									</div>
								</div>

								{/* card body */}
								<div style={{ padding: "20px" }}>
									{/* row 1: primary info */}
									<div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "16px" }}>
										<InfoChip icon="bx-user" label="Full Name" value={item.fullName ?? "—"} />
										<Divider />
										<InfoChip icon="bx-phone" label="Phone" value={item.phoneNumber ?? "—"} />
										{item.email && <><Divider /><InfoChip icon="bx-envelope" label="Email" value={item.email} /></>}
									</div>

									{/* divider */}
									<div style={{ height: "1px", background: "#f1f5f9", margin: "0 0 16px" }} />

									{/* row 2: office details */}
									<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
										{(item.city || item.preferredCity) && (
											<InfoChip icon="bx-map" label="City" value={item.city ?? item.preferredCity ?? "—"} />
										)}
										{item.center && (
											<InfoChip icon="bx-building" label="Center" value={item.center} />
										)}
										{item.companyName && (
											<InfoChip icon="bx-briefcase" label="Company" value={item.companyName} />
										)}
										{item.requiredSeats != null && (
											<InfoChip icon="bx-chair" label="Required Seats" value={String(item.requiredSeats)} />
										)}
										{item.managerCabin != null && (
											<InfoChip icon="bx-door-open" label="Manager Cabin" value={item.managerCabin ? "Yes" : "No"} />
										)}
										{item.conferenceRoom != null && (
											<InfoChip icon="bx-slideshow" label="Conference Room" value={item.conferenceRoom ? "Yes" : "No"} />
										)}
										{item.source && (
											<InfoChip icon="bx-link" label="Source" value={item.source} />
										)}
									</div>

									{/* requirements */}
									{item.requirements && (
										<>
											<div style={{ height: "1px", background: "#f1f5f9", margin: "18px 0" }} />
											<div>
												<span style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", fontWeight: 700 }}>Requirements</span>
												<p style={{ margin: "6px 0 0", fontSize: "15px", color: "#374151", lineHeight: "1.6" }}>{item.requirements}</p>
											</div>
										</>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default VirtualOfficeHistory;

