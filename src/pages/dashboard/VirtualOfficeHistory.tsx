import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserForms } from "../../hooks/useUserForms";
import type { UserFormItem } from "../../services/userFormsApi";

const formatDate = (ts: number) =>
	new Date(ts * 1000).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const statusBadge = (status?: string) => {
	const map: Record<string, { bg: string; color: string }> = {
		PENDING:  { bg: "#fff8e1", color: "#d97706" },
		REVIEWED: { bg: "#eff6ff", color: "#2563eb" },
		APPROVED: { bg: "#f0fdf4", color: "#16a34a" },
		REJECTED: { bg: "#fef2f2", color: "#dc2626" },
	};
	const key = (status ?? "PENDING").toUpperCase();
	const style = map[key] ?? map.PENDING;
	return (
		<span style={{
			background: style.bg,
			color: style.color,
			fontSize: "12px",
			fontWeight: 600,
			padding: "3px 10px",
			borderRadius: "20px",
			whiteSpace: "nowrap",
		}}>
			{key}
		</span>
	);
};

/* ── expandable detail row ── */
const DetailRow: React.FC<{ item: UserFormItem }> = ({ item }) => (
	<tr>
		<td colSpan={7} style={{ padding: "0", background: "#f8faff" }}>
			<div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", borderBottom: "1px solid #e8edf4" }}>
				{item.email && <DetailField label="Email" value={item.email} />}
				{item.companyName && <DetailField label="Company" value={item.companyName} />}
				{item.center && <DetailField label="Center" value={item.center} />}
				{item.requiredSeats != null && <DetailField label="Required Seats" value={String(item.requiredSeats)} />}
				{item.managerCabin != null && <DetailField label="Manager Cabin" value={item.managerCabin ? "Yes" : "No"} />}
				{item.conferenceRoom != null && <DetailField label="Conference Room" value={item.conferenceRoom ? "Yes" : "No"} />}
				{item.source && <DetailField label="Source" value={item.source} />}
				{item.requirements && (
					<div style={{ gridColumn: "1 / -1" }}>
						<DetailField label="Requirements" value={item.requirements} />
					</div>
				)}
			</div>
		</td>
	</tr>
);

const DetailField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
	<div>
		<p style={{ fontSize: "11px", color: "#9aa3b0", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 2px" }}>{label}</p>
		<p style={{ fontSize: "13px", color: "#1a2540", fontWeight: 500, margin: 0, wordBreak: "break-word" }}>{value}</p>
	</div>
);

/* ── main ── */
const VirtualOfficeHistory: React.FC = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useUserForms("VIRTUAL_OFFICE");
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const items: UserFormItem[] =
		data?.data?.items ?? (data?.data as Record<string, unknown>)?.["item"] as UserFormItem[] ?? [];
	const total = data?.pagination?.total ?? items.length;

	const th: React.CSSProperties = {
		padding: "14px 16px",
		textAlign: "left",
		fontWeight: 600,
		fontSize: "13px",
		color: "#6b7280",
		whiteSpace: "nowrap",
		borderBottom: "1px solid #e8edf4",
	};

	const td: React.CSSProperties = {
		padding: "14px 16px",
		fontSize: "13px",
		color: "#374151",
		whiteSpace: "nowrap",
		borderBottom: "1px solid #f0f4fa",
		verticalAlign: "middle",
	};

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
		<div className="content-section">
			{/* header */}
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
				<h2 style={{ color: "#00275c", fontSize: "20px", fontWeight: 700, margin: 0, fontFamily: "Outfit, sans-serif" }}>
					Virtual Office History
				</h2>
				{items.length > 0 && (
					<span style={{ fontSize: "13px", color: "#6b7280", background: "#f3f4f6", padding: "4px 12px", borderRadius: "20px", fontFamily: "Outfit, sans-serif" }}>
						{total} submission{total !== 1 ? "s" : ""}
					</span>
				)}
			</div>

			{/* table */}
			<div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #e8edf4" }}>
				<table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Outfit, sans-serif", background: "#fff" }}>
					<thead>
						<tr style={{ background: "#f9fafb" }}>
							<th style={th}>Ref ID</th>
							<th style={th}>Name</th>
							<th style={th}>Phone</th>
							<th style={th}>City</th>
							<th style={th}>Submitted</th>
							<th style={th}>Status</th>
							<th style={{ ...th, textAlign: "center" }}>Details</th>
						</tr>
					</thead>
					<tbody>
						{items.length === 0 ? (
							<tr>
								<td colSpan={7} style={{ padding: "60px 20px", textAlign: "center", color: "#9ca3af", fontSize: "15px" }}>
									No submissions found
								</td>
							</tr>
						) : (
							items.map((item) => {
								const isExpanded = expandedId === item._id;
								return (
									<React.Fragment key={item._id}>
										<tr style={{ transition: "background 0.15s", background: isExpanded ? "#f8faff" : "#fff" }}
											onMouseEnter={e => { if (!isExpanded)(e.currentTarget as HTMLTableRowElement).style.background = "#f9fafb"; }}
											onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = isExpanded ? "#f8faff" : "#fff"; }}
										>
											<td style={{ ...td, color: "#00275c", fontWeight: 600 }}>
												{item.formReferenceId ?? "—"}
											</td>
											<td style={td}>{item.fullName}</td>
											<td style={td}>{item.phoneNumber}</td>
											<td style={td}>{item.city ?? item.preferredCity ?? "—"}</td>
											<td style={{ ...td, color: "#6b7280" }}>{formatDate(item.createdAt)}</td>
											<td style={td}>{statusBadge(item.status)}</td>
											<td style={{ ...td, textAlign: "center" }}>
												<button
													onClick={() => setExpandedId(isExpanded ? null : item._id)}
													style={{
														background: "none",
														border: "1px solid #d1d5db",
														borderRadius: "6px",
														padding: "4px 10px",
														cursor: "pointer",
														color: "#6b7280",
														fontSize: "12px",
														fontFamily: "Outfit, sans-serif",
														display: "inline-flex",
														alignItems: "center",
														gap: "4px",
														transition: "all 0.2s",
													}}
												>
													<i className={`bx ${isExpanded ? "bx-chevron-up" : "bx-chevron-down"}`} style={{ fontSize: "14px" }} />
													{isExpanded ? "Hide" : "View"}
												</button>
											</td>
										</tr>
										{isExpanded && <DetailRow item={item} />}
									</React.Fragment>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{items.length === 0 && (
				<div style={{ textAlign: "center", marginTop: "32px" }}>
					<button className="cta-button" onClick={() => navigate("/virtual-office")}>
						Explore Virtual Offices
					</button>
				</div>
			)}
		</div>
	);
};

export default VirtualOfficeHistory;

