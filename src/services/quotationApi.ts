import apiClient from "./api";

export interface QuotationPublicData {
	quotationRefId: string;
	quotationType: string;
	recipientName: string;
	recipientEmail?: string;
	recipientCompany?: string;
	recipientAddress?: string;
	lineItems: {
		description: string;
		quantity: number;
		unitPrice: number;
		gstPercent: number;
		amount: number;
		gstAmount: number;
		totalAmount: number;
	}[];
	subtotal: number;
	totalGst: number;
	totalAmount: number;
	notes?: string;
	status: "draft" | "sent" | "paid" | "cancelled" | "refunded";
	razorpayShortUrl?: string;
	paidAt?: string;
	createdAt: string;
}

export const getPublicQuotation = async (
	refId: string,
): Promise<QuotationPublicData> => {
	const res = await apiClient.get(`/core/web/quotations/public/${refId}`);
	return res.data?.data;
};
