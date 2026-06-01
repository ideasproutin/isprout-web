import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getPublicQuotation,
	type QuotationPublicData,
} from "../../services/quotationApi";

const STATUS_META: Record<
	string,
	{ label: string; bg: string; color: string }
> = {
	draft: { label: "Draft", bg: "#f1f5f9", color: "#475569" },
	sent: { label: "Sent / Pending Payment", bg: "#eff6ff", color: "#2563eb" },
	paid: { label: "Payment Received", bg: "#f0fdf4", color: "#16a34a" },
	cancelled: { label: "Cancelled", bg: "#fef2f2", color: "#dc2626" },
	refunded: { label: "Refunded", bg: "#fffbeb", color: "#d97706" },
};

function toINR(value: number) {
	return (value || 0).toLocaleString("en-IN");
}

export default function QuotationPublicPage() {
	const { refId } = useParams<{ refId: string }>();
	const [data, setData] = useState<QuotationPublicData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!refId) return;
		setLoading(true);
		getPublicQuotation(refId)
			.then(setData)
			.catch(() => setError("Quotation not found or link has expired."))
			.finally(() => setLoading(false));
	}, [refId]);

	const statusMeta = data ? STATUS_META[data.status] : null;

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#f0f4ff",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "40px 16px 60px",
			}}
		>
			{loading && (
				<div
					style={{
						marginTop: "80px",
						color: "#888",
						fontSize: "16px",
					}}
				>
					Loading quotation…
				</div>
			)}

			{!loading && error && (
				<div
					style={{
						marginTop: "80px",
						background: "#fff",
						borderRadius: "14px",
						padding: "40px 32px",
						textAlign: "center",
						boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
						maxWidth: "480px",
						width: "100%",
					}}
				>
					<div style={{ fontSize: "40px", marginBottom: "12px" }}>
						🔍
					</div>
					<h2
						style={{
							color: "#333",
							fontWeight: 700,
							marginBottom: "8px",
						}}
					>
						Quotation Not Found
					</h2>
					<p style={{ color: "#888", fontSize: "14px" }}>{error}</p>
				</div>
			)}

			{!loading && data && (
				<div style={{ width: "100%", maxWidth: "640px" }}>
					{/* Branding */}
					<div style={{ textAlign: "center", marginBottom: "28px" }}>
						<span
							style={{
								fontSize: "22px",
								fontWeight: 800,
								color: "#1a1a2e",
								letterSpacing: "0.5px",
							}}
						>
							iSprout
						</span>
					</div>

					{/* Card */}
					<div
						style={{
							background: "#fff",
							borderRadius: "16px",
							overflow: "hidden",
							boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
						}}
					>
						{/* Header */}
						<div
							style={{
								background: "#1a1a2e",
								padding: "24px 32px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div>
									<div
										style={{
											color: "#facc15",
											fontSize: "11px",
											fontWeight: 700,
											textTransform: "uppercase",
											letterSpacing: "1.5px",
											marginBottom: "4px",
										}}
									>
										Quotation
									</div>
									<div
										style={{
											color: "#fff",
											fontFamily: "monospace",
											fontSize: "18px",
											fontWeight: 700,
										}}
									>
										{data.quotationRefId}
									</div>
								</div>
								{statusMeta && (
									<span
										style={{
											background: statusMeta.bg,
											color: statusMeta.color,
											fontSize: "12px",
											fontWeight: 700,
											padding: "5px 14px",
											borderRadius: "20px",
										}}
									>
										{statusMeta.label}
									</span>
								)}
							</div>
							{data.quotationType && (
								<div style={{ marginTop: "10px" }}>
									<span
										style={{
											background: "#2d2d52",
											color: "#a5b4fc",
											fontSize: "11px",
											fontWeight: 600,
											padding: "3px 10px",
											borderRadius: "12px",
										}}
									>
										{data.quotationType.toUpperCase()}
									</span>
								</div>
							)}
						</div>

						{/* Recipient */}
						<div style={{ padding: "24px 32px 0 32px" }}>
							<div style={{ marginBottom: "22px" }}>
								<div
									style={{
										fontSize: "11px",
										color: "#aaa",
										textTransform: "uppercase",
										letterSpacing: "1px",
										marginBottom: "6px",
									}}
								>
									Prepared For
								</div>
								<div
									style={{
										fontWeight: 700,
										fontSize: "16px",
										color: "#1a1a2e",
									}}
								>
									{data.recipientName}
								</div>
								{data.recipientCompany && (
									<div
										style={{
											color: "#555",
											fontSize: "13px",
											marginTop: "2px",
										}}
									>
										{data.recipientCompany}
									</div>
								)}
								{data.recipientEmail && (
									<div
										style={{
											color: "#888",
											fontSize: "12px",
											marginTop: "2px",
										}}
									>
										{data.recipientEmail}
									</div>
								)}
								{data.recipientAddress && (
									<div
										style={{
											color: "#888",
											fontSize: "12px",
											marginTop: "2px",
										}}
									>
										{data.recipientAddress}
									</div>
								)}
								<div
									style={{
										color: "#bbb",
										fontSize: "11px",
										marginTop: "4px",
									}}
								>
									Issued:{" "}
									{new Date(
										data.createdAt,
									).toLocaleDateString("en-IN", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</div>
							</div>

							{/* Line items */}
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									marginBottom: "16px",
									borderRadius: "8px",
									overflow: "hidden",
								}}
							>
								<thead>
									<tr style={{ background: "#1a1a2e" }}>
										<th
											style={{
												padding: "9px 12px",
												textAlign: "left",
												color: "#facc15",
												fontSize: "11px",
												fontWeight: 700,
												textTransform: "uppercase",
											}}
										>
											Description
										</th>
										<th
											style={{
												padding: "9px 12px",
												textAlign: "center",
												color: "#facc15",
												fontSize: "11px",
												fontWeight: 700,
												width: "44px",
											}}
										>
											Qty
										</th>
										<th
											style={{
												padding: "9px 12px",
												textAlign: "right",
												color: "#facc15",
												fontSize: "11px",
												fontWeight: 700,
												width: "80px",
											}}
										>
											Rate
										</th>
										<th
											style={{
												padding: "9px 12px",
												textAlign: "right",
												color: "#facc15",
												fontSize: "11px",
												fontWeight: 700,
												width: "90px",
											}}
										>
											Amount
										</th>
									</tr>
								</thead>
								<tbody>
									{data.lineItems.map((item, i) => (
										<tr
											key={i}
											style={{
												borderBottom:
													"1px solid #f0f0f0",
												background:
													i % 2 === 0
														? "#fff"
														: "#fafafa",
											}}
										>
											<td
												style={{
													padding: "10px 12px",
													color: "#333",
													fontSize: "13px",
												}}
											>
												{item.description}
												{item.gstPercent > 0 && (
													<span
														style={{
															fontSize: "10px",
															color: "#888",
															marginLeft: "4px",
														}}
													>
														(GST {item.gstPercent}%)
													</span>
												)}
											</td>
											<td
												style={{
													padding: "10px 12px",
													textAlign: "center",
													color: "#555",
													fontSize: "13px",
												}}
											>
												{item.quantity}
											</td>
											<td
												style={{
													padding: "10px 12px",
													textAlign: "right",
													color: "#555",
													fontSize: "13px",
												}}
											>
												₹{toINR(item.unitPrice)}
											</td>
											<td
												style={{
													padding: "10px 12px",
													textAlign: "right",
													fontWeight: 600,
													fontSize: "13px",
												}}
											>
												₹{toINR(item.totalAmount)}
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr
										style={{
											borderTop: "1px solid #e8ecf4",
										}}
									>
										<td
											colSpan={3}
											style={{
												padding: "7px 12px",
												textAlign: "right",
												color: "#888",
												fontSize: "12px",
											}}
										>
											Subtotal
										</td>
										<td
											style={{
												padding: "7px 12px",
												textAlign: "right",
												fontWeight: 600,
												fontSize: "13px",
											}}
										>
											₹{toINR(data.subtotal)}
										</td>
									</tr>
									<tr>
										<td
											colSpan={3}
											style={{
												padding: "5px 12px",
												textAlign: "right",
												color: "#888",
												fontSize: "12px",
											}}
										>
											GST
										</td>
										<td
											style={{
												padding: "5px 12px",
												textAlign: "right",
												fontWeight: 600,
												fontSize: "13px",
											}}
										>
											₹{toINR(data.totalGst)}
										</td>
									</tr>
									<tr style={{ background: "#f0f4ff" }}>
										<td
											colSpan={3}
											style={{
												padding: "12px",
												textAlign: "right",
												color: "#1a1a2e",
												fontWeight: 700,
												fontSize: "14px",
											}}
										>
											Total Payable
										</td>
										<td
											style={{
												padding: "12px",
												textAlign: "right",
												color: "#1a1a2e",
												fontWeight: 800,
												fontSize: "17px",
											}}
										>
											₹{toINR(data.totalAmount)}
										</td>
									</tr>
								</tfoot>
							</table>

							{/* Notes */}
							{data.notes && (
								<div
									style={{
										background: "#fffbea",
										borderLeft: "3px solid #facc15",
										padding: "10px 14px",
										borderRadius: "0 6px 6px 0",
										marginBottom: "20px",
									}}
								>
									<span
										style={{
											fontSize: "12px",
											color: "#666",
										}}
									>
										<strong>Notes:</strong> {data.notes}
									</span>
								</div>
							)}
						</div>

						{/* CTA */}
						{data.status === "sent" && data.razorpayShortUrl && (
							<div style={{ padding: "8px 32px 28px 32px" }}>
								<a
									href={data.razorpayShortUrl}
									target='_blank'
									rel='noreferrer'
									style={{
										display: "block",
										background: "#facc15",
										color: "#1a1a2e",
										textAlign: "center",
										padding: "15px 20px",
										borderRadius: "10px",
										fontSize: "15px",
										fontWeight: 700,
										textDecoration: "none",
										letterSpacing: "0.3px",
									}}
								>
									Pay Now — ₹{toINR(data.totalAmount)}
								</a>
								<p
									style={{
										fontSize: "11px",
										color: "#aaa",
										textAlign: "center",
										marginTop: "8px",
									}}
								>
									Powered by Razorpay · Secure payment
								</p>
							</div>
						)}

						{data.status === "paid" && (
							<div
								style={{
									margin: "0 32px 28px 32px",
									background: "#f0fdf4",
									border: "1px solid #bbf7d0",
									borderRadius: "10px",
									padding: "16px",
									textAlign: "center",
								}}
							>
								<div
									style={{
										fontSize: "24px",
										marginBottom: "6px",
									}}
								>
									✅
								</div>
								<div
									style={{
										color: "#16a34a",
										fontWeight: 700,
										fontSize: "14px",
									}}
								>
									Payment Received
								</div>
								{data.paidAt && (
									<div
										style={{
											color: "#888",
											fontSize: "12px",
											marginTop: "4px",
										}}
									>
										Paid on{" "}
										{new Date(
											data.paidAt,
										).toLocaleDateString("en-IN", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</div>
								)}
							</div>
						)}

						{data.status === "cancelled" && (
							<div
								style={{
									margin: "0 32px 28px 32px",
									background: "#fef2f2",
									border: "1px solid #fecaca",
									borderRadius: "10px",
									padding: "16px",
									textAlign: "center",
								}}
							>
								<div
									style={{
										color: "#dc2626",
										fontWeight: 700,
										fontSize: "14px",
									}}
								>
									This quotation has been cancelled
								</div>
							</div>
						)}

						{/* Footer */}
						<div
							style={{
								background: "#f4f6fa",
								padding: "16px 32px",
								borderTop: "1px solid #e8ecf4",
								textAlign: "center",
							}}
						>
							<p
								style={{
									margin: 0,
									fontSize: "11px",
									color: "#aaa",
								}}
							>
								iSprout Business Center Pvt Ltd &nbsp;·&nbsp;
								+91 84649 99920 &nbsp;·&nbsp; isprout.in
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
