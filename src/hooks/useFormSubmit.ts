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
            if (!payload.phoneNumber) {
                throw new Error("Phone number is required");
            }
 
            const response = await submitForm(payload);
            setSuccess(true);
            const apiSuccessMessage =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (response as any)?.data?.item?.message ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (response as any)?.status?.message;
            const finalSuccessMessage =
                (successMessage && successMessage.trim()) ||
                (typeof apiSuccessMessage === "string" && apiSuccessMessage.trim()) ||
                "Form submitted successfully!";

            toast.success(finalSuccessMessage);
 
            if (onSuccess) {
                onSuccess();
            }
 
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>,
): Partial<FormSubmissionData> => {
    const normalizedType = formType.toLowerCase();
    const formTypeMap: Record<string, string> = {
        book_tour: "BOOK_TOUR",
        contact_us: "CONTACT_US",
        virtual_office: "VIRTUAL_OFFICE",
        apply_jobs: "APPLY_JOBS",
        apply_now: "APPLY_NOW",
        meeting_room: "MEETING_ROOM",
        city: "CITY_FORM",
        city_form: "CITY_FORM",
        center: "CENTER_FORM",
        center_form: "CENTER_FORM",
    };
    const canonicalFormType = formTypeMap[normalizedType] || formType;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const basePayload: Record<string, any> = {
        formType: canonicalFormType,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        acceptedTerms: data.acceptTerms || data.acceptedTerms || false,
    };
 
    // Only include email if it exists and has a value
    const emailValue = data.email || data.workEmail;
    if (emailValue && typeof emailValue === 'string' && emailValue.trim()) {
        basePayload.email = emailValue;
    }
 
    switch (normalizedType) {
        case "book_tour":
            return {
                ...basePayload,
                companyName: data.companyName,
                city: data.city,
                center: data.center || data.centerName,
                requirements: data.requirements,
                managerCabin: data.managerCabin || false,
                conferenceRoom: data.conferenceRoom || false,
                requiredSeats: typeof data.requiredSeats === 'number' ? data.requiredSeats : (typeof data.requiredSeats === 'string' ? parseInt(data.requiredSeats, 10) : 0),
                source: data.source,
                comments: data.comments,
                preferredCity: data.preferredCity,
            };
 
        case "contact_us": {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const contactUsPayload: Record<string, any> = { ...basePayload };
           
            // Only include optional fields if they have values
            if (typeof data.companyName === 'string' && data.companyName.trim()) {
                contactUsPayload.companyName = data.companyName;
            }
            if (typeof data.comments === 'string' && data.comments.trim()) {
                contactUsPayload.comments = data.comments;
            }
            if (typeof data.city === 'string' && data.city.trim()) {
                contactUsPayload.city = data.city;
            }
            // Always send center if available (which page form was filled from)
            if ((typeof data.centre === 'string' && data.centre.trim()) || (typeof data.centerName === 'string' && data.centerName.trim())) {
                contactUsPayload.center = data.centre || data.centerName;
            }
            if (data.requiredSeats) {
                contactUsPayload.requiredSeats = typeof data.requiredSeats === 'number' ? data.requiredSeats : (typeof data.requiredSeats === 'string' ? parseInt(data.requiredSeats, 10) : 0);
            }
           
            return contactUsPayload;
        }
 
    case "virtual_office": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const virtualOfficePayload: Record<string, any> = { ...basePayload };
       
        // Only include optional fields if they have values
        if (typeof data.companyName === 'string' && data.companyName.trim()) {
            virtualOfficePayload.companyName = data.companyName;
        }
        if (typeof data.city === 'string' && data.city.trim()) {
            virtualOfficePayload.city = data.city;
        }
        if ((typeof data.center === 'string' && data.center.trim()) || (typeof data.centerName === 'string' && data.centerName.trim())) {
            virtualOfficePayload.center = data.center || data.centerName;
        }
        if (typeof data.requirements === 'string' && data.requirements.trim()) {
            virtualOfficePayload.requirements = data.requirements;
        }
        if (typeof data.source === 'string' && data.source.trim()) {
            virtualOfficePayload.source = data.source;
        }
        if (typeof data.preferredCity === 'string' && data.preferredCity.trim()) {
            virtualOfficePayload.preferredCity = data.preferredCity;
        }
        // Include boolean fields with default values
        virtualOfficePayload.managerCabin = data.managerCabin || false;
        virtualOfficePayload.conferenceRoom = data.conferenceRoom || false;
       
        return virtualOfficePayload;
    }

        case "apply_now":
            return {
                ...basePayload,
                jobRole: data.jobRole || data.jobTitle || data.role,
                jobLocation: data.jobLocation,
                location: data.location,
                city: data.city,
                resumeUrl: data.resumeUrl || data.resumeData,
            };
 
        case "city_form":
        case "city": {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cityFormPayload: Record<string, any> = { ...basePayload };
           
            // Only include optional fields if they have values
            if (typeof data.companyName === 'string' && data.companyName.trim()) {
                cityFormPayload.companyName = data.companyName;
            }
            if (typeof data.city === 'string' && data.city.trim()) {
                cityFormPayload.city = data.city;
            }
            if (data.requiredSeats) {
                cityFormPayload.requiredSeats = typeof data.requiredSeats === 'number' ? data.requiredSeats : (typeof data.requiredSeats === 'string' ? parseInt(data.requiredSeats, 10) : 0);
            }
           
            return cityFormPayload;
        }

        case "center_form":
        case "center": {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const centerFormPayload: Record<string, any> = { ...basePayload };
           
            // Only include optional fields if they have values
            if (typeof data.companyName === 'string' && data.companyName.trim()) {
                centerFormPayload.companyName = data.companyName;
            }
            if (typeof data.city === 'string' && data.city.trim()) {
                centerFormPayload.city = data.city;
            }
            // Handle center field - check multiple possible field names
            if ((typeof data.center === 'string' && data.center.trim()) || 
                (typeof data.centre === 'string' && data.centre.trim()) || 
                (typeof data.centerName === 'string' && data.centerName.trim())) {
                centerFormPayload.center = data.center || data.centre || data.centerName;
            }
            if (data.requiredSeats) {
                centerFormPayload.requiredSeats = typeof data.requiredSeats === 'number' ? data.requiredSeats : (typeof data.requiredSeats === 'string' ? parseInt(data.requiredSeats, 10) : 0);
            }
            // Include boolean fields with default values
            centerFormPayload.managerCabin = data.managerCabin || false;
            centerFormPayload.conferenceRoom = data.conferenceRoom || false;
           
            return centerFormPayload;
        }
 
        default:
            // For any other form type, just return all data
            // while preserving canonical formType required by backend
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { formType: _ignoredFormType, ...restData } = data;
            return {
                ...basePayload,
                ...restData,
            };
    }
};
 
 