import { useState } from "react";
import {
	submitForm,
	type FormSubmissionData,
} from "../services/formServiceApi";
import toast from "react-hot-toast";

interface UseFormSubmitOptions {
	onSuccess?: () => void;
	onError?: (error: string) => void;
	successMessage?: string;
	errorMessage?: string;
}

export const useFormSubmit = (options: UseFormSubmitOptions = {}) => {
	const {
		onSuccess,
		onError,
		successMessage = "Form submitted successfully!",
		errorMessage = "Failed to submit form. Please try again.",
	} = options;

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isCaptchaError, setIsCaptchaError] = useState(false);

	const submit = async (
		formData: Partial<FormSubmissionData>,
		recaptchaToken?: string,
	) => {
		setIsSubmitting(true);
		setError(null);
		setSuccess(false);

		try {
			// Merge recaptchaToken into formData as captchaToken (API only accepts captchaToken)
			const payload: FormSubmissionData = {
				...formData,
				...(recaptchaToken && {
					captchaToken: recaptchaToken,
				}),
			} as FormSubmissionData;

			// Validate required fields
			if (!payload.formType) {
				throw new Error("Form type is required");
			}
			if (!payload.fullName) {
				throw new Error("Full name is required");
			}
			if (!payload.email) {
				throw new Error("Email is required");
			}
			if (!payload.phoneNumber) {
				throw new Error("Phone number is required");
			}

			await submitForm(payload);
			setSuccess(true);
			toast.success(successMessage);

			if (onSuccess) {
				onSuccess();
			}

			return true;
		} catch (err: unknown) {
			const errorMsg =
				(err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'status' in err.response.data && err.response.data.status && typeof err.response.data.status === 'object' && 'message' in err.response.data.status && typeof err.response.data.status.message === 'string' ? err.response.data.status.message : null) ||
				(err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data && typeof err.response.data.message === 'string' ? err.response.data.message : null) ||
				(err instanceof Error ? err.message : null) ||
				errorMessage;

			// Check if it's a captcha error
			const isCaptchaErr =
				errorMsg.toLowerCase().includes("captcha") ||
				errorMsg.toLowerCase().includes("recaptcha");

			setIsCaptchaError(isCaptchaErr);
			setError(errorMsg);
			toast.error(errorMsg);

			if (onError) {
				onError(errorMsg);
			}

			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	const reset = () => {
		setError(null);
		setSuccess(false);
		setIsSubmitting(false);
		setIsCaptchaError(false);
	};

	return {
		submit,
		isSubmitting,
		error,
		success,
		isCaptchaError,
		reset,
	};
};

// Utility function to build form payload for different form types
export const buildFormPayload = (
	formType: string,
	data: Record<string, unknown>,
): Partial<FormSubmissionData> => {
	const basePayload = {
		formType,
		fullName: data.fullName as string,
		email: (data.email || data.workEmail) as string,
		phoneNumber: data.phoneNumber as string,
		acceptedTerms: (data.acceptTerms || data.acceptedTerms || false) as boolean,
	};

	switch (formType) {
		case "BOOK_TOUR":
			return {
				...basePayload,
				companyName: data.companyName as string,
				city: data.city as string,
				center: (data.center || data.centerName) as string,
				requirements: data.requirements as string,
				managerCabin: (data.managerCabin || false) as boolean,
				conferenceRoom: (data.conferenceRoom || false) as boolean,
				requiredSeats: parseInt(String(data.requiredSeats || '')) || 0,
				source: data.source as string,
				comments: data.comments as string,
				preferredCity: data.preferredCity as string,
			};

		case "CONTACT_US":
			return {
				...basePayload,
				companyName: data.companyName as string,
				comments: data.comments as string,
			};

		case "VIRTUAL_OFFICE":
			return {
				...basePayload,
				companyName: data.companyName as string,
				city: data.city as string,
				center: (data.center || data.centerName) as string,
				requirements: data.requirements as string,
				managerCabin: (data.managerCabin || false) as boolean,
				conferenceRoom: (data.conferenceRoom || false) as boolean,
				source: data.source as string,
				preferredCity: data.preferredCity as string,
			};

		case "APPLY_NOW":
		case "APPLY_JOBS":
			return {
				...basePayload,
				jobRole: (data.jobRole || data.jobTitle) as string,
				jobLocation: data.jobLocation as string,
				location: data.location as string,
				city: data.city as string,
				resumeUrl: (data.resumeUrl || data.resumeData) as string,
			};

		case "CITY_FORM":
			return {
				...basePayload,
				companyName: data.companyName as string,
				city: data.city as string,
				requiredSeats: parseInt(String(data.requiredSeats || '')) || 0,
			};

		default:
			// For any other form type, just return all data
			return {
				...basePayload,
				...data,
			};
	}
};
