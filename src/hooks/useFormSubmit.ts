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
		} catch (err: any) {
			const errorMsg =
				err?.response?.data?.status?.message ||
				err?.response?.data?.message ||
				err?.message ||
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
	data: Record<string, any>,
): Partial<FormSubmissionData> => {
	const basePayload = {
		formType,
		fullName: data.fullName,
		email: data.email || data.workEmail,
		phoneNumber: data.phoneNumber,
		acceptedTerms: data.acceptTerms || data.acceptedTerms || false,
	};

	switch (formType) {
		case "BOOK_TOUR":
			return {
				...basePayload,
				companyName: data.companyName,
				city: data.city,
				center: data.center || data.centerName,
				requirements: data.requirements,
				managerCabin: data.managerCabin || false,
				conferenceRoom: data.conferenceRoom || false,
				requiredSeats: parseInt(data.requiredSeats) || 0,
				source: data.source,
				comments: data.comments,
				preferredCity: data.preferredCity,
			};

		case "CONTACT_US":
			return {
				...basePayload,
				companyName: data.companyName,
				comments: data.comments,
			};

		case "VIRTUAL_OFFICE":
			return {
				...basePayload,
				companyName: data.companyName,
				city: data.city,
				center: data.center || data.centerName,
				requirements: data.requirements,
				managerCabin: data.managerCabin || false,
				conferenceRoom: data.conferenceRoom || false,
				source: data.source,
				preferredCity: data.preferredCity,
			};

    case "APPLY_NOW":
    case "APPLY_JOBS":
      return {
        ...basePayload,
        jobRole: data.jobRole || data.jobTitle,
        jobLocation: data.jobLocation,
        location: data.location,
        city: data.city,
        resumeUrl: data.resumeUrl || data.resumeData,
      };

		default:
			// For any other form type, just return all data
			return {
				...basePayload,
				...data,
			};
	}
};
