/**
 * Payment Gateway Service
 * Handles all Razorpay payment operations for meeting room bookings
 */

import apiClient from "../api";
import toast from "react-hot-toast";
import {
	razorpayConfig,
	type CreatePaymentSessionRequest,
	type PaymentSessionResponse,
	type RazorpayOptions,
	type RazorpayPaymentResponse,
	type BookingSlot,
} from "./razorpayConfig";

/**
 * Load Razorpay script dynamically
 */
const loadRazorpayScript = (): Promise<boolean> => {
	return new Promise((resolve) => {
		// Check if script already loaded
		if (window.Razorpay) {
			resolve(true);
			return;
		}

		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
};

/**
 * Create payment session with backend
 */
const createPaymentSession = async (
	data: CreatePaymentSessionRequest,
): Promise<PaymentSessionResponse> => {
	try {
		// Get access token from localStorage
		const accessToken = localStorage.getItem("accessToken");

		const response = await apiClient.post<PaymentSessionResponse>(
			razorpayConfig.endpoint,
			data,
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			},
		);

		if (response.data.status.type !== "success") {
			throw new Error(
				response.data.status.message ||
					"Failed to create payment session",
			);
		}

		return response.data;
	} catch (error: any) {
		const errorMessage =
			error?.response?.data?.status?.message ||
			error?.response?.data?.message ||
			error?.message ||
			"Failed to create payment session";
		throw new Error(errorMessage);
	}
};

/**
 * Meeting Room Payment Interface
 * This is what you'll use in your component
 */
export interface MeetingRoomPaymentData {
	// Room details
	meetingRoomId: string;
	roomName: string;
	roomCode: string;

	// Location details
	centerId: string;
	cityId: string;
	floorId: string;
	centerName?: string;

	// Booking details
	bookingDate: string; // Format: "DD-MM-YYYY"
	slots: BookingSlot[];

	// Amount details (in rupees)
	totalAmount: number; // Including GST

	// User details
	userName: string;
	userEmail: string;
	userPhone: string;
}

/**
 * Payment Callbacks
 */
export interface PaymentCallbacks {
	onSuccess?: (
		response: RazorpayPaymentResponse,
		sessionData: PaymentSessionResponse,
	) => void;
	onError?: (error: string) => void;
	onDismiss?: () => void;
}

/**
 * Main Payment Gateway Class
 */
class PaymentGateway {
	/**
	 * Process payment for meeting room booking
	 */
	async processPayment(
		bookingData: MeetingRoomPaymentData,
		callbacks: PaymentCallbacks = {},
	): Promise<void> {
		const { onSuccess, onError, onDismiss } = callbacks;

		try {
			// Step 1: Load Razorpay script
			const scriptLoaded = await loadRazorpayScript();
			if (!scriptLoaded) {
				throw new Error(
					"Failed to load Razorpay SDK. Please check your internet connection.",
				);
			}

			// Step 2: Create payment session with backend
			const paymentRequest: CreatePaymentSessionRequest = {
				mode: "bookings",
				transactionType: "cash",
				userType: "external",
				bookingMode: "meeting-room",
				bookingData: {
					centerId: bookingData.centerId,
					cityId: bookingData.cityId,
					meetingRoomId: bookingData.meetingRoomId,
					bookingDate: bookingData.bookingDate,
					floorId: bookingData.floorId,
					totalAmount: bookingData.totalAmount,
					slots: bookingData.slots,
				},
			};

			const sessionResponse = await createPaymentSession(paymentRequest);
			const { orderId, amount, currency, userData } =
				sessionResponse.data.item;

			// Step 3: Configure Razorpay options
			const razorpayOptions: RazorpayOptions = {
				key: razorpayConfig.key,
				amount: amount * 100, // Convert to paise
				currency: currency,
				name: "iSprout Meeting Room",
				description: `${bookingData.roomName} (${bookingData.roomCode})`,
				order_id: orderId,
				handler: async (response: RazorpayPaymentResponse) => {
					// Payment successful
					toast.success("Payment successful!");

					if (onSuccess) {
						onSuccess(response, sessionResponse);
						console.log("Payment response:", response);
						console.log("Session response:", sessionResponse);

						try {
							const accessToken =
								localStorage.getItem("accessToken");
							const verifyRes = await apiClient.post(
								razorpayConfig.verifyPaymentEndpoint,
								response,
								{
									headers: {
										"X-Auth-Token": accessToken || "",
									},
								},
							);
							console.log(
								"Verify payment response:",
								verifyRes.data,
							);
						} catch (verifyError: any) {
							console.error(
								"Payment verification failed:",
								verifyError?.message,
							);
						}
					}
				},
				prefill: {
					name: userData.name || bookingData.userName,
					email: userData.email || bookingData.userEmail,
					contact: bookingData.userPhone,
				},
				theme: razorpayConfig.theme,
				modal: {
					ondismiss: () => {
						toast.error("Payment cancelled");
						if (onDismiss) {
							onDismiss();
						}
					},
				},
			};

			// Step 4: Open Razorpay payment modal
			const razorpay = new window.Razorpay(razorpayOptions);
			razorpay.open();
		} catch (error: any) {
			const errorMessage =
				error?.message || "Payment initialization failed";
			toast.error(errorMessage);
			if (onError) {
				onError(errorMessage);
			}
		}
	}
}

// Export singleton instance
export const paymentGateway = new PaymentGateway();

// Export types
export type { BookingSlot, RazorpayPaymentResponse, PaymentSessionResponse };
