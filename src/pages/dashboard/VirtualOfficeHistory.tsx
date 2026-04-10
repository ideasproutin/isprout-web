import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useVirtualOfficeData } from "../../hooks/useBookingData";
import { useDeleteVirtualOfficeFiles } from "../../hooks/useDeleteVirtualOfficeFiles";
import { useUpdateVirtualOfficeForm } from "../../hooks/useUpdateVirtualOfficeForm";
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

	if (
		Array.isArray(raw.items) &&
		raw.items.length > 0 &&
		isRecord(raw.items[0])
	) {
		return raw.items[0];
	}

	return raw;
};

/* ─── document type options ─── */
const DOCUMENT_TYPES = [
	{ label: "CIN", value: "cin" },
	{ label: "Board Resolution", value: "boardResolution" },
	{ label: "PAN", value: "pan" },
	{ label: "TAN", value: "tan" },
	{ label: "Cancelled Cheque", value: "cancelledCheque" },
	{ label: "Signatory Aadhar", value: "signatoryAadhar" },
	{ label: "Signatory PAN", value: "signatoryPan" },
] as const;

/* Keys excluded from the form-info grid (shown in dedicated doc sections, card body, or purely internal) */
const EXCLUDED_DETAIL_KEYS = new Set([
	"userFiles",
	"adminFiles",
	"adminDocuments",
	"documents",
	"files",
	// internal / noisy fields
	"_id",
	"id",
	"formType",
	"userId",
	"acceptedTerms",
	"createdAt",
	"updatedAt",
	"createdAtUnix",
	"updatedAtUnix",
	"__v",
	// already shown on the card body
	"formReferenceId",
	"status",
	"fullName",
	"phoneNumber",
	"email",
	"city",
	"preferredCity",
	"center",
	"companyName",
	"requiredSeats",
	"managerCabin",
	"conferenceRoom",
	"source",
	"requirements",
	"startDate",
	"endDate",
]);

/* Extract the URL string from a file item (string or object) */
const fileItemUrl = (item: unknown): string => {
	if (typeof item === "string") return item;
	if (isRecord(item)) {
		return (
			(typeof item.url === "string" && item.url) ||
			(typeof item.fileUrl === "string" && item.fileUrl) ||
			(typeof item.attachmentUrl === "string" && item.attachmentUrl) ||
			""
		);
	}
	return "";
};

/* Extract URLs returned by the upload API (handles various response shapes) */
const extractUploadedUrls = (data: unknown): string[] => {
	if (!data) return [];
	if (typeof data === "string" && isLikelyUrl(data)) return [data];
	if (Array.isArray(data))
		return data.flatMap(extractUploadedUrls).filter(Boolean) as string[];
	if (isRecord(data)) {
		for (const key of [
			"fileUrls",
			"urls",
			"fileUrl",
			"url",
			"files",
			"attachmentUrl",
			"path",
		]) {
			if (data[key]) {
				const result = extractUploadedUrls(data[key]);
				if (result.length) return result;
			}
		}
	}
	return [];
};

/* Get the raw userFiles array from detailData (preserves original items for PUT) */
const getExistingUserFiles = (detailData: GenericRecord | null): unknown[] => {
	if (!detailData) return [];
	const raw = detailData.userFiles;
	if (!Array.isArray(raw)) return [];
	return raw;
};

/* Extract admin-uploaded documents */
const extractAdminDocs = (detail: GenericRecord | null): DocumentEntry[] => {
	if (!detail) return [];
	for (const key of ["adminFiles", "adminDocuments", "documents", "files"]) {
		const arr = detail[key];
		if (!Array.isArray(arr) || arr.length === 0) continue;
		return arr.reduce<DocumentEntry[]>((acc, item, idx) => {
			const url = fileItemUrl(item);
			if (!url || !isLikelyUrl(url)) return acc;
			const name = isRecord(item)
				? (typeof item.name === "string" && item.name) ||
					(typeof item.fileName === "string" && item.fileName) ||
					`${toLabel(key)} ${idx + 1}`
				: `${toLabel(key)} ${idx + 1}`;
			acc.push({ key, url, name: name as string });
			return acc;
		}, []);
	}
	return [];
};

/* Extract user-uploaded documents */
const extractUserDocs = (detail: GenericRecord | null): DocumentEntry[] => {
	if (!detail) return [];
	const raw = detail.userFiles;
	if (!Array.isArray(raw)) return [];
	return raw.reduce<DocumentEntry[]>((acc, item, idx) => {
		const url = fileItemUrl(item);
		if (!url || !isLikelyUrl(url)) return acc;
		const name = isRecord(item)
			? (typeof item.name === "string" && item.name) ||
				(typeof item.documentType === "string" &&
					toLabel(item.documentType)) ||
				(typeof item.fieldName === "string" &&
					toLabel(item.fieldName)) ||
				`Document ${idx + 1}`
			: `Document ${idx + 1}`;
		const fileId = isRecord(item)
			? (typeof item._id === "string" && item._id) ||
				(typeof item.id === "string" && item.id) ||
				undefined
			: undefined;
		acc.push({
			key: "userFiles",
			url,
			name: name as string,
			fileId: fileId || undefined,
		});
		return acc;
	}, []);
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
	let date: Date;
	if (typeof ts === "string" && /[a-zA-Z\-:]/.test(ts)) {
		// ISO string like "2026-04-10T07:23:50.921Z"
		date = new Date(ts);
	} else {
		const timestamp =
			typeof ts === "number" ? ts : parseInt(String(ts), 10);
		date = new Date(timestamp * 1000);
	}
	return date.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};

const STATUS_MAP: Record<
	string,
	{ bg: string; color: string; border: string }
> = {
	// Legacy values
	PENDING: { bg: "#fffbeb", color: "#b45309", border: "#fcd34d" },
	REVIEWED: { bg: "#eff6ff", color: "#1d4ed8", border: "#93c5fd" },
	APPROVED: { bg: "#f0fdf4", color: "#15803d", border: "#86efac" },
	REJECTED: { bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5" },
	// Backend statuses
	INQUIRY_RECEIVED: { bg: "#fffbeb", color: "#b45309", border: "#fcd34d" },
	KYC_AND_DOCUMENTS_SUBMITTED: {
		bg: "#faf5ff",
		color: "#7c3aed",
		border: "#c4b5fd",
	},
	AGREEMENT_PREPARATION: {
		bg: "#fff7ed",
		color: "#c2410c",
		border: "#fdba74",
	},
	AGREEMENT_REVIEW_AND_CONFIRMATION: {
		bg: "#eff6ff",
		color: "#1d4ed8",
		border: "#93c5fd",
	},
	PAYMENT_CONFIRMATION: {
		bg: "#fefce8",
		color: "#a16207",
		border: "#fde047",
	},
	AGREEMENT_SIGNED: { bg: "#ecfdf5", color: "#065f46", border: "#6ee7b7" },
	VIRTUAL_OFFICE_ACTIVATED: {
		bg: "#f0fdf4",
		color: "#15803d",
		border: "#86efac",
	},
	RENEWAL_PROCESS_STARTED: {
		bg: "#fff1f2",
		color: "#be123c",
		border: "#fda4af",
	},
	RENEWAL_COMPLETED: { bg: "#f0fdf4", color: "#166534", border: "#4ade80" },
};

const STATUS_LABEL: Record<string, string> = {
	INQUIRY_RECEIVED: "Inquiry Received",
	KYC_AND_DOCUMENTS_SUBMITTED: "KYC & Docs Submitted",
	AGREEMENT_PREPARATION: "Agreement Preparation",
	AGREEMENT_REVIEW_AND_CONFIRMATION: "Agreement Review",
	PAYMENT_CONFIRMATION: "Payment Confirmation",
	AGREEMENT_SIGNED: "Agreement Signed",
	VIRTUAL_OFFICE_ACTIVATED: "Active",
	RENEWAL_PROCESS_STARTED: "Renewal Started",
	RENEWAL_COMPLETED: "Renewed",
	// Legacy
	PENDING: "Pending",
	REVIEWED: "Reviewed",
	APPROVED: "Approved",
	REJECTED: "Rejected",
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
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [documentType, setDocumentType] = useState<string>("");
	const [isUploading, setIsUploading] = useState(false);
	const [isDeletingUrl, setIsDeletingUrl] = useState<string | null>(null);

	const {
		data: detailResponse,
		isLoading: isDetailLoading,
		refetch: refetchDetails,
	} = useVirtualOfficeFormById(expandedId ?? undefined);

	const detailData = useMemo(
		() => resolveDetailItem(detailResponse?.data),
		[detailResponse],
	);

	const adminDocs = useMemo(() => extractAdminDocs(detailData), [detailData]);
	const userDocs = useMemo(() => extractUserDocs(detailData), [detailData]);

	const uploadMutation = useUploadVirtualOfficeFiles();
	const deleteMutation = useDeleteVirtualOfficeFiles();
	const updateFormMutation = useUpdateVirtualOfficeForm();

	const raw = data?.data;
	const items: BookingItem[] =
		((raw?.items && raw.items.length > 0
			? raw.items
			: null) as BookingItem[]) ??
		((raw?.item && raw.item.length > 0
			? raw.item
			: null) as BookingItem[]) ??
		[];

	const handleToggleExpand = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	const handleUpload = async () => {
		if (!expandedId) {
			toast.error("Please select a form first");
			return;
		}
		if (!documentType) {
			toast.error("Please select a document type");
			return;
		}
		if (!selectedFile) {
			toast.error("Please choose a file to upload");
			return;
		}

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("formId", expandedId);
			formData.append(documentType, selectedFile); // named file field = docType key

			const uploadResult = await uploadMutation.mutateAsync({ formData });
			if (!uploadResult?.data) {
				toast.error("Upload failed: invalid server response");
				return;
			}
			const newUrls = extractUploadedUrls(uploadResult.data);

			const existingItems = getExistingUserFiles(detailData);
			const updatedUserFiles = [...existingItems, ...newUrls];

			await updateFormMutation.mutateAsync({
				formId: expandedId as string,
				userFiles: updatedUserFiles,
			});

			toast.success("Document uploaded successfully");
			setSelectedFile(null);
			setDocumentType("");
			refetchDetails();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Upload failed";
			toast.error(msg);
		} finally {
			setIsUploading(false);
		}
	};

	const handleDelete = async (doc: DocumentEntry) => {
		if (!expandedId) return;
		setIsDeletingUrl(doc.url);
		try {
			await deleteMutation.mutateAsync({
				formId: expandedId as string,
				fileUrls: [doc.url],
				...(doc.fileId ? { fileId: doc.fileId } : {}),
			});

			const existingItems = getExistingUserFiles(detailData);
			const updatedUserFiles = existingItems.filter(
				(item) => fileItemUrl(item) !== doc.url,
			);

			await updateFormMutation.mutateAsync({
				formId: expandedId as string,
				userFiles: updatedUserFiles,
			});

			toast.success("Document deleted successfully");
			refetchDetails();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Delete failed";
			toast.error(msg);
		} finally {
			setIsDeletingUrl(null);
		}
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
							const statusLabel =
								STATUS_LABEL[statusKey] ??
								statusKey.replace(/_/g, " ");

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
													onClick={() =>
														handleToggleExpand(
															item._id,
														)
													}
													style={{
														marginTop: "8px",
														background:
															"rgba(255,255,255,0.2)",
														color: "#fff",
														border: "1px solid rgba(255,255,255,0.35)",
														borderRadius: "999px",
														padding: "4px 10px",
														fontSize: "12px",
														fontWeight: 700,
														cursor: "pointer",
														display: "inline-flex",
														alignItems: "center",
														gap: "4px",
													}}
												>
													{expandedId === item._id
														? "Hide Details"
														: "View Details"}
													<i
														className={`bx ${
															expandedId ===
															item._id
																? "bx-chevron-up"
																: "bx-chevron-down"
														}`}
													/>
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
												{statusLabel}
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
											<InfoChip
												icon='bx-envelope'
												label='Email'
												value={item.email ?? "—"}
											/>
											<InfoChip
												icon='bx-briefcase'
												label='Company'
												value={item.companyName ?? "—"}
											/>
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
											<InfoChip
												icon='bx-map'
												label='City'
												value={
													item.city ??
													item.preferredCity ??
													"—"
												}
											/>
											{item.center && (
												<InfoChip
													icon='bx-building'
													label='Center'
													value={item.center}
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
											{item.startDate != null && (
												<InfoChip
													icon='bx-calendar'
													label='Start Date'
													value={formatDate(
														item.startDate,
													)}
												/>
											)}
											{item.endDate != null && (
												<InfoChip
													icon='bx-calendar-check'
													label='End Date'
													value={formatDate(
														item.endDate,
													)}
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

									{/* ── Inline expansion: 3 sections ── */}
									<div
										style={{
											display: "grid",
											gridTemplateRows:
												expandedId === item._id
													? "1fr"
													: "0fr",
											transition:
												"grid-template-rows 0.35s ease",
										}}
									>
										<div
											style={{
												overflow: "hidden",
											}}
										>
											<div
												style={{
													height: "1px",
													background: "#e5e7eb",
												}}
											/>
											<div
												style={{
													padding: "16px",
													background: "#f8fafc",
												}}
											>
												{isDetailLoading ? (
													<p
														style={{
															margin: 0,
															color: "#475569",
															fontSize: "13px",
														}}
													>
														Loading details…
													</p>
												) : (
													<>
														{/* Section 1: Your Details */}
														{detailData &&
															Object.keys(
																detailData,
															).some(
																(k) =>
																	!EXCLUDED_DETAIL_KEYS.has(
																		k,
																	),
															) && (
																<div
																	style={{
																		marginBottom:
																			"20px",
																	}}
																>
																	<h4
																		style={{
																			margin: "0 0 12px",
																			color: "#0f172a",
																			fontSize:
																				"15px",
																			fontWeight: 700,
																			display:
																				"flex",
																			alignItems:
																				"center",
																			gap: "6px",
																		}}
																	>
																		<i
																			className='bx bx-list-ul'
																			style={{
																				color: "#00275c",
																			}}
																		/>
																		Your
																		Details
																	</h4>
																	<div
																		style={{
																			display:
																				"grid",
																			gridTemplateColumns:
																				"repeat(auto-fill, minmax(200px, 1fr))",
																			gap: "10px",
																		}}
																	>
																		{Object.entries(
																			detailData,
																		)
																			.filter(
																				([
																					key,
																				]) =>
																					!EXCLUDED_DETAIL_KEYS.has(
																						key,
																					),
																			)
																			.map(
																				([
																					key,
																					value,
																				]) => (
																					<div
																						key={
																							key
																						}
																						style={{
																							background:
																								"#fff",
																							border: "1px solid #e2e8f0",
																							borderRadius:
																								"10px",
																							padding:
																								"10px",
																						}}
																					>
																						<p
																							style={{
																								margin: 0,
																								fontSize:
																									"11px",
																								fontWeight: 700,
																								letterSpacing:
																									"0.4px",
																								textTransform:
																									"uppercase",
																								color: "#64748b",
																							}}
																						>
																							{toLabel(
																								key,
																							)}
																						</p>
																						<p
																							style={{
																								margin: "6px 0 0",
																								fontSize:
																									"13px",
																								color: "#0f172a",
																								wordBreak:
																									"break-word",
																							}}
																						>
																							{formatDetailValue(
																								value,
																							)}
																						</p>
																					</div>
																				),
																			)}
																	</div>
																</div>
															)}

														{/* Section 2: My Documents */}
														<div>
															<h4
																style={{
																	margin: "0 0 10px",
																	color: "#0f172a",
																	fontSize:
																		"15px",
																	fontWeight: 700,
																	display:
																		"flex",
																	alignItems:
																		"center",
																	gap: "6px",
																}}
															>
																<i
																	className='bx bx-upload'
																	style={{
																		color: "#00275c",
																	}}
																/>
																My Documents
															</h4>
															{userDocs.length >
																0 && (
																<div
																	style={{
																		display:
																			"flex",
																		flexDirection:
																			"column",
																		gap: "8px",
																		marginBottom:
																			"16px",
																	}}
																>
																	{userDocs.map(
																		(
																			doc,
																			index,
																		) => (
																			<div
																				key={`user-${doc.url}-${index}`}
																				style={{
																					display:
																						"flex",
																					justifyContent:
																						"space-between",
																					alignItems:
																						"center",
																					gap: "10px",
																					padding:
																						"10px 12px",
																					border: "1px solid #e2e8f0",
																					borderRadius:
																						"8px",
																					background:
																						"#fff",
																				}}
																			>
																				<div
																					style={{
																						display:
																							"flex",
																						alignItems:
																							"center",
																						gap: "8px",
																						minWidth: 0,
																					}}
																				>
																					<i
																						className='bx bx-file-blank'
																						style={{
																							fontSize:
																								"20px",
																							color: "#64748b",
																							flexShrink: 0,
																						}}
																					/>
																					<p
																						style={{
																							margin: 0,
																							fontSize:
																								"13px",
																							fontWeight: 700,
																							color: "#0f172a",
																							wordBreak:
																								"break-word",
																						}}
																					>
																						{
																							doc.name
																						}
																					</p>
																				</div>
																				<div
																					style={{
																						display:
																							"flex",
																						gap: "8px",
																						flexShrink: 0,
																					}}
																				>
																					<a
																						href={
																							doc.url
																						}
																						target='_blank'
																						rel='noreferrer'
																						style={{
																							padding:
																								"7px 10px",
																							borderRadius:
																								"6px",
																							border: "1px solid #cbd5e1",
																							background:
																								"#fff",
																							color: "#0f172a",
																							textDecoration:
																								"none",
																							fontSize:
																								"12px",
																							fontWeight: 700,
																						}}
																					>
																						View
																					</a>
																					<button
																						type='button'
																						onClick={() =>
																							handleDelete(
																								doc,
																							)
																						}
																						disabled={
																							isDeletingUrl ===
																							doc.url
																						}
																						style={{
																							padding:
																								"7px 10px",
																							borderRadius:
																								"6px",
																							border: "none",
																							background:
																								"#b91c1c",
																							color: "#fff",
																							fontSize:
																								"12px",
																							fontWeight: 700,
																							cursor: "pointer",
																							opacity:
																								isDeletingUrl ===
																								doc.url
																									? 0.7
																									: 1,
																						}}
																					>
																						{isDeletingUrl ===
																						doc.url
																							? "Deleting…"
																							: "Delete"}
																					</button>
																				</div>
																			</div>
																		),
																	)}
																</div>
															)}

															{/* Upload new document */}
															<p
																style={{
																	margin: "0 0 8px",
																	fontSize:
																		"13px",
																	fontWeight: 700,
																	color: "#475569",
																}}
															>
																Upload New
																Document
															</p>
															<div
																style={{
																	display:
																		"grid",
																	gridTemplateColumns:
																		"repeat(auto-fill, minmax(220px, 1fr))",
																	gap: "10px",
																	alignItems:
																		"end",
																}}
															>
																<div>
																	<label
																		style={{
																			fontSize:
																				"12px",
																			color: "#64748b",
																			fontWeight: 700,
																		}}
																	>
																		Document
																		Type
																	</label>
																	<select
																		value={
																			documentType
																		}
																		onChange={(
																			e,
																		) =>
																			setDocumentType(
																				e
																					.target
																					.value,
																			)
																		}
																		style={{
																			marginTop:
																				"6px",
																			width: "100%",
																			padding:
																				"10px 14px",
																			border: "1px solid #cbd5e1",
																			borderRadius:
																				"8px",
																			outline:
																				"none",
																			background:
																				"#fff",
																			color: documentType
																				? "#0f172a"
																				: "#94a3b8",
																			fontSize:
																				"14px",
																			fontFamily:
																				"Outfit, sans-serif",
																			fontWeight: 500,
																			cursor: "pointer",
																			appearance:
																				"none",
																			WebkitAppearance:
																				"none",
																			backgroundImage:
																				"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
																			backgroundRepeat:
																				"no-repeat",
																			backgroundPosition:
																				"right 12px center",
																			paddingRight:
																				"36px",
																			transition:
																				"border-color 0.2s ease, box-shadow 0.2s ease",
																		}}
																		onFocus={(
																			e,
																		) => {
																			e.currentTarget.style.borderColor =
																				"#00275c";
																			e.currentTarget.style.boxShadow =
																				"0 0 0 3px rgba(0,39,92,0.08)";
																		}}
																		onBlur={(
																			e,
																		) => {
																			e.currentTarget.style.borderColor =
																				"#cbd5e1";
																			e.currentTarget.style.boxShadow =
																				"none";
																		}}
																	>
																		<option value=''>
																			Select
																			document
																			type…
																		</option>
																		{DOCUMENT_TYPES.map(
																			(
																				dt,
																			) => (
																				<option
																					key={
																						dt.value
																					}
																					value={
																						dt.value
																					}
																				>
																					{
																						dt.label
																					}
																				</option>
																			),
																		)}
																	</select>
																</div>
																<div>
																	<label
																		style={{
																			fontSize:
																				"12px",
																			color: "#64748b",
																			fontWeight: 700,
																		}}
																	>
																		Choose
																		File
																	</label>
																	<input
																		type='file'
																		onChange={(
																			e,
																		) =>
																			setSelectedFile(
																				e
																					.target
																					.files?.[0] ||
																					null,
																			)
																		}
																		style={{
																			marginTop:
																				"6px",
																			width: "100%",
																			padding:
																				"8px",
																			border: "1px solid #cbd5e1",
																			borderRadius:
																				"8px",
																		}}
																	/>
																</div>
																<button
																	type='button'
																	onClick={
																		handleUpload
																	}
																	disabled={
																		isUploading
																	}
																	style={{
																		height: "42px",
																		background:
																			"#00275c",
																		color: "#fff",
																		border: "none",
																		borderRadius:
																			"8px",
																		fontWeight: 700,
																		cursor: isUploading
																			? "not-allowed"
																			: "pointer",
																		opacity:
																			isUploading
																				? 0.7
																				: 1,
																		fontSize:
																			"14px",
																	}}
																>
																	{isUploading ? (
																		<>
																			<i
																				className='bx bx-loader-alt bx-spin'
																				style={{
																					marginRight:
																						"6px",
																				}}
																			/>
																			Uploading…
																		</>
																	) : (
																		<>
																			<i
																				className='bx bx-upload'
																				style={{
																					marginRight:
																						"6px",
																				}}
																			/>
																			Upload
																		</>
																	)}
																</button>
															</div>
														</div>

														{/* Section 3: Documents from iSprout */}
														{adminDocs.length >
															0 && (
															<>
																<div
																	style={{
																		height: "1px",
																		background:
																			"#e5e7eb",
																		margin: "16px 0",
																	}}
																/>
																<h4
																	style={{
																		margin: "0 0 10px",
																		color: "#0f172a",
																		fontSize:
																			"15px",
																		fontWeight: 700,
																		display:
																			"flex",
																		alignItems:
																			"center",
																		gap: "6px",
																	}}
																>
																	<i
																		className='bx bx-file'
																		style={{
																			color: "#00275c",
																		}}
																	/>
																	Documents
																	from iSprout
																</h4>
																<div
																	style={{
																		display:
																			"flex",
																		flexDirection:
																			"column",
																		gap: "8px",
																	}}
																>
																	{adminDocs.map(
																		(
																			doc,
																			idx,
																		) => (
																			<div
																				key={`admin-${doc.url}-${idx}`}
																				style={{
																					display:
																						"flex",
																					justifyContent:
																						"space-between",
																					alignItems:
																						"center",
																					gap: "10px",
																					padding:
																						"10px 12px",
																					border: "1px solid #bfdbfe",
																					borderRadius:
																						"8px",
																					background:
																						"#eff6ff",
																				}}
																			>
																				<div
																					style={{
																						display:
																							"flex",
																						alignItems:
																							"center",
																						gap: "8px",
																						minWidth: 0,
																					}}
																				>
																					<i
																						className='bx bx-file-blank'
																						style={{
																							fontSize:
																								"20px",
																							color: "#1d4ed8",
																							flexShrink: 0,
																						}}
																					/>
																					<p
																						style={{
																							margin: 0,
																							fontSize:
																								"13px",
																							fontWeight: 700,
																							color: "#1e3a8a",
																							wordBreak:
																								"break-word",
																						}}
																					>
																						{
																							doc.name
																						}
																					</p>
																				</div>
																				<a
																					href={
																						doc.url
																					}
																					target='_blank'
																					rel='noreferrer'
																					style={{
																						padding:
																							"7px 12px",
																						borderRadius:
																							"6px",
																						border: "1px solid #93c5fd",
																						background:
																							"#fff",
																						color: "#1d4ed8",
																						textDecoration:
																							"none",
																						fontSize:
																							"12px",
																						fontWeight: 700,
																						flexShrink: 0,
																					}}
																				>
																					<i
																						className='bx bx-show'
																						style={{
																							marginRight:
																								"4px",
																						}}
																					/>
																					View
																				</a>
																			</div>
																		),
																	)}
																</div>
															</>
														)}
													</>
												)}
											</div>
										</div>
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
