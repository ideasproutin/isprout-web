import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useVirtualOfficeData } from "../../hooks/useBookingData";
import { useDeleteVirtualOfficeFiles } from "../../hooks/useDeleteVirtualOfficeFiles";
import { useUploadVirtualOfficeFiles } from "../../hooks/useUploadVirtualOfficeFiles";
import { useVirtualOfficeFormById } from "../../hooks/useVirtualOfficeFormById";
import type { BookingItem } from "../../services/bookingDataApi";

type GenericRecord = Record<string, unknown>;

interface DocumentEntry {
	key: string;
	url: string;
	name: string;
	fileId?: string;
}

const isRecord = (value: unknown): value is GenericRecord =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const isLikelyUrl = (value: string) =>
	/^https?:\/\//i.test(value) || value.startsWith("/");

const toLabel = (value: string) =>
	value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/[_-]+/g, " ")
		.trim();

const resolveDetailItem = (raw: unknown): GenericRecord | null => {
	if (!isRecord(raw)) return null;

	if (isRecord(raw.item)) {
		return raw.item;
	}

	if (Array.isArray(raw.items) && raw.items.length > 0 && isRecord(raw.items[0])) {
		return raw.items[0];
	}

	return raw;
};

const extractDocuments = (details: GenericRecord | null): DocumentEntry[] => {
	if (!details) return [];

	const docs: DocumentEntry[] = [];

	Object.entries(details).forEach(([key, value]) => {
		if (typeof value === "string" && isLikelyUrl(value)) {
			docs.push({ key, url: value, name: `${toLabel(key)} file` });
			return;
		}

		if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (typeof item === "string" && isLikelyUrl(item)) {
					docs.push({
						key,
						url: item,
						name: `${toLabel(key)} ${index + 1}`,
					});
					return;
				}

				if (!isRecord(item)) return;

				const urlCandidate =
					(typeof item.url === "string" && item.url) ||
					(typeof item.fileUrl === "string" && item.fileUrl) ||
					(typeof item.attachmentUrl === "string" && item.attachmentUrl) ||
					(typeof item.path === "string" && item.path) ||
					"";

				if (!urlCandidate || !isLikelyUrl(urlCandidate)) return;

				docs.push({
					key,
					url: urlCandidate,
					name:
						(typeof item.name === "string" && item.name) ||
						(typeof item.fileName === "string" && item.fileName) ||
						(typeof item.documentName === "string" && item.documentName) ||
						`${toLabel(key)} ${index + 1}`,
					fileId:
						(typeof item._id === "string" && item._id) ||
						(typeof item.id === "string" && item.id) ||
						undefined,
				});
			});
			return;
		}

		if (!isRecord(value)) return;

		const nestedUrl =
			(typeof value.url === "string" && value.url) ||
			(typeof value.fileUrl === "string" && value.fileUrl) ||
			(typeof value.attachmentUrl === "string" && value.attachmentUrl) ||
			"";

		if (!nestedUrl || !isLikelyUrl(nestedUrl)) return;

		docs.push({
			key,
			url: nestedUrl,
			name:
				(typeof value.name === "string" && value.name) ||
				(typeof value.fileName === "string" && value.fileName) ||
				toLabel(key),
			fileId:
				(typeof value._id === "string" && value._id) ||
				(typeof value.id === "string" && value.id) ||
				undefined,
		});
	});

	const seen = new Set<string>();
	return docs.filter((doc) => {
		const uniqueKey = `${doc.key}::${doc.url}`;
		if (seen.has(uniqueKey)) return false;
		seen.add(uniqueKey);
		return true;
	});
};

const formatDetailValue = (value: unknown): string => {
	if (value == null) return "-";
	if (typeof value === "string" || typeof value === "number") {
		return String(value);
	}
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (Array.isArray(value)) {
		return value
			.map((entry) =>
				typeof entry === "string" || typeof entry === "number"
					? String(entry)
					: JSON.stringify(entry),
			)
			.join(", ");
	}
	return JSON.stringify(value);
};

const formatDate = (ts: number | string) => {
	const timestamp = typeof ts === "number" ? ts : parseInt(String(ts), 10);
	return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};

const STATUS_MAP: Record<
	string,
	{ bg: string; color: string; border: string }
> = {
	PENDING: { bg: "#fffbeb", color: "#b45309", border: "#fcd34d" },
	REVIEWED: { bg: "#eff6ff", color: "#1d4ed8", border: "#93c5fd" },
	APPROVED: { bg: "#f0fdf4", color: "#15803d", border: "#86efac" },
	REJECTED: { bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5" },
};

const InfoChip: React.FC<{ icon: string; label: string; value: string }> = ({
	icon,
	label,
	value,
}) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "4px",
			minWidth: 0,
		}}
	>
		<span
			style={{
				fontSize: "12px",
				color: "#9ca3af",
				textTransform: "uppercase",
				letterSpacing: "0.6px",
				fontWeight: 600,
			}}
		>
			{label}
		</span>
		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<i
				className={`bx ${icon}`}
				style={{ fontSize: "16px", color: "#00275c", flexShrink: 0 }}
			/>
			<span
				style={{
					fontSize: "14px",
					color: "#1e293b",
					fontWeight: 600,
					wordBreak: "break-word",
				}}
			>
				{value}
			</span>
		</div>
	</div>
);

/* ── main ── */
const VirtualOfficeHistory: React.FC = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError, refetch } = useVirtualOfficeData();
	const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
	const [selectedFormCode, setSelectedFormCode] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [documentLabel, setDocumentLabel] = useState("");

	const {
		data: detailResponse,
		isLoading: isDetailLoading,
		refetch: refetchDetails,
	} = useVirtualOfficeFormById(selectedFormId ?? undefined);

	const detailData = useMemo(
		() => resolveDetailItem(detailResponse?.data),
		[detailResponse],
	);

	const documents = useMemo(
		() => extractDocuments(detailData),
		[detailData],
	);

	const uploadMutation = useUploadVirtualOfficeFiles({
		onSuccess: (res) => {
			toast.success(res.status?.message || "Document uploaded successfully");
			setSelectedFile(null);
			refetchDetails();
		},
		onError: (err) => {
			const message =
				err instanceof Error
					? err.message
					: "Unable to upload document";
			toast.error(message);
		},
	});

	const deleteMutation = useDeleteVirtualOfficeFiles({
		onSuccess: (res) => {
			toast.success(res.status?.message || "Document deleted successfully");
			refetchDetails();
		},
		onError: (err) => {
			const message =
				err instanceof Error
					? err.message
					: "Unable to delete document";
			toast.error(message);
		},
	});

	const raw = data?.data;
	const items: BookingItem[] =
		((raw?.items && raw.items.length > 0
			? raw.items
			: null) as BookingItem[]) ??
		((raw?.item && raw.item.length > 0
			? raw.item
			: null) as BookingItem[]) ??
		[];

	const handleViewDetails = (item: BookingItem) => {
		setSelectedFormId(item._id);
		setSelectedFormCode(item.formReferenceId || item._id);
	};

	const handleUpload = () => {
		if (!selectedFormId) {
			toast.error("Please select a form first");
			return;
		}

		if (!selectedFile) {
			toast.error("Please choose a file to upload");
			return;
		}

		if (!documentLabel.trim()) {
			toast.error("Please enter document type (example: KYC, Aadhaar)");
			return;
		}

		const formData = new FormData();
		formData.append("attachments", selectedFile);
		formData.append("files", selectedFile);
		formData.append("documentType", documentLabel.trim());
		formData.append("documentKey", documentLabel.trim());
		formData.append("formId", selectedFormId);
		formData.append("id", selectedFormId);

		if (detailData && typeof detailData.formReferenceId === "string") {
			formData.append("formReferenceId", detailData.formReferenceId);
		}

		uploadMutation.mutate({ formData });
	};

	const handleDelete = (doc: DocumentEntry) => {
		if (!selectedFormId) return;

		const payload: Record<string, unknown> = {
			formId: selectedFormId,
			id: selectedFormId,
			refId: selectedFormId,
			documentType: doc.key,
			documentKey: doc.key,
			fileUrl: doc.url,
			attachmentUrl: doc.url,
			url: doc.url,
		};

		if (doc.fileId) {
			payload.fileId = doc.fileId;
			payload.attachmentId = doc.fileId;
		}

		if (detailData && typeof detailData.formReferenceId === "string") {
			payload.formReferenceId = detailData.formReferenceId;
		}

		deleteMutation.mutate(payload);
	};

	if (isLoading) {
		return (
			<div className='content-section'>
				<div className='empty-state'>
					<i
						className='bx bx-loader-alt bx-spin'
						style={{ color: "#00275c", fontSize: "60px" }}
					/>
					<p>Loading your virtual office submissions…</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='content-section'>
				<div style={{ textAlign: "center", padding: "60px 20px" }}>
					<i
						className='bx bx-building-house'
						style={{ fontSize: "72px", color: "#d1d5db" }}
					/>
					<p
						style={{
							color: "#9ca3af",
							fontSize: "18px",
							margin: "16px 0 28px",
						}}
					>
						No submissions found
					</p>
					<div
						style={{
							display: "flex",
							gap: "12px",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						<button
							className='cta-button'
							onClick={() => refetch()}
						>
							Retry
						</button>
						<button
							className='cta-button'
							onClick={() => navigate("/virtual-office")}
						>
							Explore Virtual Offices
						</button>
					</div>
				</div>
			</div>
		); 
	}

	return (
		<div
			className='content-section'
			style={{ fontFamily: "Outfit, sans-serif" }}
		>
			{selectedFormId && (
				<div
					style={{
						background: "#ffffff",
						border: "1px solid #e5e7eb",
						borderRadius: "14px",
						padding: "16px",
						marginBottom: "18px",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: "12px",
						}}
					>
						<div>
							<h3
								style={{
									margin: 0,
									fontSize: "18px",
									color: "#0f172a",
								}}
							>
								Form Details: {selectedFormCode}
							</h3>
							<p
								style={{
									margin: "4px 0 0",
									fontSize: "13px",
									color: "#64748b",
								}}
							>
								Full submission details + documents
							</p>
						</div>
						<button
							className='cta-button'
							onClick={() => refetchDetails()}
						>
							Refresh
						</button>
					</div>

					<div
						style={{
							height: "1px",
							background: "#f1f5f9",
							margin: "14px 0",
						}}
					/>

					{isDetailLoading ? (
						<p style={{ margin: 0, color: "#475569" }}>
							Loading form details...
						</p>
					) : detailData ? (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
								gap: "12px",
							}}
						>
							{Object.entries(detailData).map(([key, value]) => (
								<div
									key={key}
									style={{
										background: "#f8fafc",
										border: "1px solid #e2e8f0",
										borderRadius: "10px",
										padding: "10px",
									}}
								>
									<p
										style={{
											margin: 0,
											fontSize: "11px",
											fontWeight: 700,
											letterSpacing: "0.4px",
											textTransform: "uppercase",
											color: "#64748b",
										}}
									>
										{toLabel(key)}
									</p>
									<p
										style={{
											margin: "6px 0 0",
											fontSize: "13px",
											color: "#0f172a",
											wordBreak: "break-word",
										}}
									>
										{formatDetailValue(value)}
									</p>
								</div>
							))}
						</div>
					) : (
						<p style={{ margin: 0, color: "#475569" }}>
							No detailed data returned for this form yet.
						</p>
					)}

					<div
						style={{
							height: "1px",
							background: "#f1f5f9",
							margin: "16px 0",
						}}
					/>

					<h4 style={{ margin: "0 0 10px", color: "#0f172a" }}>
						Upload Document
					</h4>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
							gap: "10px",
							alignItems: "end",
						}}
					>
						<div>
							<label
								style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}
							>
								Document Type
							</label>
							<input
								type='text'
								placeholder='e.g. KYC, Aadhaar, PAN, GST'
								value={documentLabel}
								onChange={(e) => setDocumentLabel(e.target.value)}
								style={{
									marginTop: "6px",
									width: "100%",
									padding: "10px 12px",
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									outline: "none",
								}}
							/>
						</div>
						<div>
							<label
								style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}
							>
								Choose File
							</label>
							<input
								type='file'
								onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
								style={{
									marginTop: "6px",
									width: "100%",
									padding: "8px",
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
								}}
							/>
						</div>
						<button
							type='button'
							onClick={handleUpload}
							disabled={uploadMutation.isPending}
							style={{
								height: "42px",
								background: "#00275c",
								color: "#fff",
								border: "none",
								borderRadius: "8px",
								fontWeight: 700,
								cursor: "pointer",
								opacity: uploadMutation.isPending ? 0.7 : 1,
							}}
						>
							{uploadMutation.isPending ? "Uploading..." : "Upload"}
						</button>
					</div>

					<div
						style={{
							height: "1px",
							background: "#f1f5f9",
							margin: "16px 0",
						}}
					/>

					<h4 style={{ margin: "0 0 10px", color: "#0f172a" }}>
						Uploaded Documents
					</h4>
					{documents.length === 0 ? (
						<p style={{ margin: 0, color: "#64748b" }}>
							No uploaded files found for this form.
						</p>
					) : (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							{documents.map((doc, index) => (
								<div
									key={`${doc.key}-${doc.url}-${index}`}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: "10px",
										padding: "10px 12px",
										border: "1px solid #e2e8f0",
										borderRadius: "8px",
										background: "#f8fafc",
									}}
								>
									<div style={{ minWidth: 0 }}>
										<p
											style={{
												margin: 0,
												fontSize: "13px",
												fontWeight: 700,
												color: "#0f172a",
											}}
										>
											{doc.name}
										</p>
										<p
											style={{
												margin: "4px 0 0",
												fontSize: "12px",
												color: "#64748b",
												wordBreak: "break-all",
											}}
										>
											{doc.url}
										</p>
									</div>
									<div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
										<a
											href={doc.url}
											target='_blank'
											rel='noreferrer'
											style={{
												padding: "8px 10px",
												borderRadius: "6px",
												border: "1px solid #cbd5e1",
												background: "#fff",
												color: "#0f172a",
												textDecoration: "none",
												fontSize: "12px",
												fontWeight: 700,
											}}
										>
											View
										</a>
										<button
											type='button'
											onClick={() => handleDelete(doc)}
											disabled={deleteMutation.isPending}
											style={{
												padding: "8px 10px",
												borderRadius: "6px",
												border: "none",
												background: "#b91c1c",
												color: "#fff",
												fontSize: "12px",
												fontWeight: 700,
												cursor: "pointer",
												opacity: deleteMutation.isPending ? 0.7 : 1,
											}}
										>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* cards */}
			{items.length === 0 ? (
				<div style={{ textAlign: "center", padding: "60px 20px" }}>
					<i
						className='bx bx-building-house'
						style={{ fontSize: "72px", color: "#d1d5db" }}
					/>
					<p
						style={{
							color: "#9ca3af",
							fontSize: "18px",
							margin: "16px 0 28px",
						}}
					>
						No submissions found
					</p>
					<button
						className='cta-button'
						onClick={() => navigate("/virtual-office")}
					>
						Explore Virtual Offices
					</button>
				</div>
			) : (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "16px",
						}}
					>
						{items.map((item) => {
							const statusKey = (
								item.status ?? "PENDING"
							).toUpperCase();
							const statusStyle =
								STATUS_MAP[statusKey] ?? STATUS_MAP.PENDING;

							return (
								<div
									key={item._id}
									style={{
										background: "#fff",
										borderRadius: "14px",
										border: "1px solid #e5e7eb",
										overflow: "hidden",
										boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
										transition: "box-shadow 0.2s",
									}}
									onMouseEnter={(e) =>
										((
											e.currentTarget as HTMLDivElement
										).style.boxShadow =
											"0 4px 16px rgba(0,39,92,0.10)")
									}
									onMouseLeave={(e) =>
										((
											e.currentTarget as HTMLDivElement
										).style.boxShadow =
											"0 1px 4px rgba(0,0,0,0.05)")
									}
								>
									{/* card top bar */}
									<div
										style={{
											background:
												"linear-gradient(135deg, #00275c 0%, #003d8f 100%)",
											padding: "14px 16px",
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
											flexWrap: "wrap",
											gap: "10px",
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
											}}
										>
											<div
												style={{
													background:
														"rgba(255,255,255,0.15)",
													borderRadius: "8px",
													padding: "6px 8px",
													display: "flex",
													alignItems: "center",
												}}
											>
												<i
													className='bx bx-buildings'
													style={{
														fontSize: "18px",
														color: "#fff",
													}}
												/>
											</div>
											<div>
												<p
													style={{
														margin: 0,
														fontSize: "13px",
														color: "rgba(255,255,255,0.85)",
														letterSpacing: "0.6px",
														textTransform:
															"uppercase",
													}}
												>
													Virtual Office
												</p>
												<p
													style={{
														margin: 0,
														fontSize: "16px",
														fontWeight: 800,
														color: "#fff",
													}}
												>
													{item.formReferenceId ??
														"—"}
												</p>
													<button
														type='button'
														onClick={() => handleViewDetails(item)}
														style={{
															marginTop: "8px",
															background: "rgba(255,255,255,0.2)",
															color: "#fff",
															border: "1px solid rgba(255,255,255,0.35)",
															borderRadius: "999px",
															padding: "4px 10px",
															fontSize: "12px",
															fontWeight: 700,
															cursor: "pointer",
														}}
													>
														View Details
													</button>
											</div>
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "12px",
											}}
										>
											<span
												style={{
													fontSize: "13px",
													color: "rgba(255,255,255,0.85)",
												}}
											>
												<i
													className='bx bx-calendar'
													style={{
														marginRight: "4px",
													}}
												/>
												{formatDate(item.createdAt)}
											</span>
											<span
												style={{
													background: statusStyle.bg,
													color: statusStyle.color,
													border: `1px solid ${statusStyle.border}`,
													fontSize: "13px",
													fontWeight: 700,
													padding: "6px 14px",
													borderRadius: "20px",
													letterSpacing: "0.4px",
												}}
											>
												{statusKey}
											</span>
										</div>
									</div>

									{/* card body */}
									<div style={{ padding: "16px" }}>
										{/* primary info — 2 col grid */}
										<div
											style={{
												display: "grid",
												gridTemplateColumns: "1fr 1fr",
												gap: "14px",
												marginBottom: "14px",
											}}
										>
											<InfoChip
												icon='bx-user'
												label='Full Name'
												value={item.fullName ?? "—"}
											/>
											<InfoChip
												icon='bx-phone'
												label='Phone'
												value={item.phoneNumber ?? "—"}
											/>
											{item.email && (
												<InfoChip
													icon='bx-envelope'
													label='Email'
													value={item.email}
												/>
											)}
										</div>

										<div
											style={{
												height: "1px",
												background: "#f1f5f9",
												margin: "0 0 14px",
											}}
										/>

										{/* office details grid */}
										<div
											style={{
												display: "grid",
												gridTemplateColumns:
													"repeat(auto-fill, minmax(130px, 1fr))",
												gap: "14px",
											}}
										>
											{(item.city ||
												item.preferredCity) && (
												<InfoChip
													icon='bx-map'
													label='City'
													value={
														item.city ??
														item.preferredCity ??
														"—"
													}
												/>
											)}
											{item.center && (
												<InfoChip
													icon='bx-building'
													label='Center'
													value={item.center}
												/>
											)}
											{item.companyName && (
												<InfoChip
													icon='bx-briefcase'
													label='Company'
													value={item.companyName}
												/>
											)}
											{item.requiredSeats != null && (
												<InfoChip
													icon='bx-chair'
													label='Seats'
													value={String(
														item.requiredSeats,
													)}
												/>
											)}
											{item.managerCabin != null && (
												<InfoChip
													icon='bx-door-open'
													label='Manager Cabin'
													value={
														item.managerCabin
															? "Yes"
															: "No"
													}
												/>
											)}
											{item.conferenceRoom != null && (
												<InfoChip
													icon='bx-slideshow'
													label='Conf. Room'
													value={
														item.conferenceRoom
															? "Yes"
															: "No"
													}
												/>
											)}
											{item.source && (
												<InfoChip
													icon='bx-link'
													label='Source'
													value={item.source}
												/>
											)}
										</div>

										{/* requirements */}
										{item.requirements && (
											<>
												<div
													style={{
														height: "1px",
														background: "#f1f5f9",
														margin: "14px 0",
													}}
												/>
												<div>
													<span
														style={{
															fontSize: "12px",
															color: "#9ca3af",
															textTransform:
																"uppercase",
															letterSpacing:
																"0.6px",
															fontWeight: 700,
														}}
													>
														Requirements
													</span>
													<p
														style={{
															margin: "6px 0 0",
															fontSize: "14px",
															color: "#374151",
															lineHeight: "1.6",
														}}
													>
														{item.requirements}
													</p>
												</div>
											</>
										)}
									</div>
								</div>
							);
						})}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "24px",
						}}
					>
						<button
							onClick={() => navigate("/virtual-office")}
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
							onMouseEnter={(e) =>
								((
									e.currentTarget as HTMLButtonElement
								).style.background = "#003d8f")
							}
							onMouseLeave={(e) =>
								((
									e.currentTarget as HTMLButtonElement
								).style.background = "#00275c")
							}
						>
							<i
								className='bx bx-buildings'
								style={{ fontSize: "18px" }}
							/>
							View Virtual Offices
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default VirtualOfficeHistory;
