import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

// Base interface for all form types
export interface BaseFormData {
  formType: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  acceptedTerms: boolean;
  captchaToken?: string;
}

// Extended interface for specific form types
export interface BookTourFormData extends BaseFormData {
  formType: "BOOK_TOUR";
  companyName: string;
  city?: string;
  center?: string;
  requirements?: string;
  managerCabin?: boolean;
  conferenceRoom?: boolean;
  requiredSeats?: number | string;
  source?: string;
  comments?: string;
  preferredCity?: string;
}

export interface ContactUsFormData extends BaseFormData {
  formType: "CONTACT_US";
  companyName: string;
  city?: string;
  requirements?: string;
  managerCabin?: boolean;
  conferenceRoom?: boolean;
  requiredSeats?: number | string;
  source?: string;
  comments?: string;
}

export interface VirtualOfficeFormData extends BaseFormData {
  formType: "VIRTUAL_OFFICE";
  companyName: string;
  city?: string;
  center?: string;
  requirements?: string;
  managerCabin?: boolean;
  conferenceRoom?: boolean;
  source?: string;
  preferredCity?: string;
}

export interface CenterFormData extends BaseFormData {
  formType: "CENTER_FORM";
  companyName: string;
  city?: string;
  center?: string;
  requiredSeats?: number | string;
  managerCabin?: boolean;
  conferenceRoom?: boolean;
}

export interface ApplyNowFormData extends BaseFormData {
  formType: "APPLY_NOW" | "APPLY_JOBS";
  jobRole: string;
  city?: string;
  resumeUrl: string;
}

// Union type for all form data types
export type FormSubmissionData =
  | BookTourFormData
  | ContactUsFormData
  | VirtualOfficeFormData
  | CenterFormData
  | ApplyNowFormData
  | (BaseFormData & Record<string, unknown>); // Allow any additional fields

export const submitForm = async (data: FormSubmissionData) => {
  const response = await apiClient.post(API_ENDPOINTS.formSubmit, data);
  return response.data;
};
