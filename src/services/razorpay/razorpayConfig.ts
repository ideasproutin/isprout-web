// Razorpay Configuration
export const razorpayConfig = {
	// Get Razorpay Key from environment variable
	key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",

	// API Endpoints
	endpoint: "/bookings/orders/create-payment-session",
	verifyPaymentEndpoint: "/bookings/orders/verify-payment",

	// Payment options
	theme: {
		color: "#FFDE00",
	},
};

// Booking slot interface
export interface BookingSlot {
	startTime: string; // Format: "HH:mm"
	endTime: string; // Format: "HH:mm"
}

// Payment session request interface (matches your API)
export interface CreatePaymentSessionRequest {
	mode: "bookings";
	transactionType: "cash";
	userType: "external";
	bookingMode: "meeting-room";
	bookingData: {
		centerId: string;
		cityId: string;
		meetingRoomId: string;
		bookingDate: string; // Format: "DD-MM-YYYY"
		floorId: string;
		totalAmount: number; // Amount in rupees
		slots: BookingSlot[];
	};
}

// Payment session response interface (matches your API)
export interface PaymentSessionResponse {
	data: {
		item: {
			orderId: string;
			paymentSessionId: string;
			userId: string;
			bookingId: string;
			centerId: string;
			cityId: string;
			amount: number;
			currency: string;
			status: string;
			paymentStatus: string;
			transactionType: string;
			bookingMode: string;
			bookingDate: string;
			slots: BookingSlot[];
			basePrice: number;
			gstAmount: number;
			userData: {
				email: string;
				name: string;
			};
			notes: {
				createdAt: number;
				mode: string;
				paymentMode: string;
				userId: string;
			};
		};
	};
	status: {
		type: string;
		message: string;
	};
}

// Razorpay payment options interface
export interface RazorpayOptions {
	key: string;
	amount: number; // in paise
	currency: string;
	name: string;
	description?: string;
	image?: string;
	order_id: string;
	handler: (response: RazorpayPaymentResponse) => void;
	prefill?: {
		name?: string;
		email?: string;
		contact?: string;
	};
	theme?: {
		color?: string;
	};
	modal?: {
		ondismiss?: () => void;
	};
}

// Razorpay payment response interface
export interface RazorpayPaymentResponse {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
}

// Declare Razorpay on window object
declare global {
	interface Window {
		Razorpay: new (options: RazorpayOptions) => {
			open: () => void;
			close: () => void;
		};
	}
}
