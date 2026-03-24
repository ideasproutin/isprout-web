import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export interface WebsiteFormFieldOption {
  label: string;
  value: string;
}

export interface WebsiteFormField {
  id?: string;
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: Array<WebsiteFormFieldOption | string>;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  icon?: string;
  inputMode?: string;
  autoComplete?: string;
}

export interface WebsiteFormConfig {
  formType?: string;
  formKey?: string;
  code?: string;
  name?: string;
  formTitle?: string;
  subtitle?: string;
  description?: string;
  successMessage?: string;
  submitButtonText?: string;
  fields?: WebsiteFormField[];
}

interface FormsApiResponse {
  data?: {
    item?: unknown;
    items?: unknown;
  };
  status?: {
    type?: string;
    message?: string;
  };
}

type FormRecord = Record<string, unknown>;

const asObject = (value: unknown): FormRecord | null => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as FormRecord;
  }
  return null;
};

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const getString = (obj: FormRecord, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
};

const getBoolean = (obj: FormRecord, keys: string[], fallback = false) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
  }
  return fallback;
};

const getNumber = (obj: FormRecord, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
};

const normalizeFieldType = (value: string | undefined) => {
  const normalized = (value || "text").trim().toLowerCase();
  if (normalized === "string") return "text";
  if (normalized === "number" || normalized === "numeric") return "number";
  if (normalized === "email") return "email";
  if (normalized === "phone" || normalized === "mobile" || normalized === "tel") return "tel";
  if (normalized === "textarea" || normalized === "multiline") return "textarea";
  if (normalized === "select" || normalized === "dropdown") return "select";
  return normalized || "text";
};

const normalizeField = (value: unknown): WebsiteFormField | undefined => {
  const fieldObject = asObject(value);
  if (!fieldObject) return undefined;

  const name = getString(fieldObject, ["name", "fieldName", "key", "id"]);
  if (!name) return undefined;

  const options = asArray(fieldObject.options)
    .map((option) => {
      if (typeof option === "string") {
        return { label: option, value: option };
      }
      const optionObject = asObject(option);
      if (!optionObject) return undefined;
      const label = getString(optionObject, ["label", "name", "title", "text"]);
      const optionValue = getString(optionObject, ["value", "id", "slug", "code", "name", "title", "text"]);
      if (!label && !optionValue) return undefined;
      return { label: label || optionValue || "Option", value: optionValue || label || "" };
    })
    .filter((option): option is WebsiteFormFieldOption => !!option);

  return {
    id: getString(fieldObject, ["id", "fieldId", "key"]),
    name,
    label: getString(fieldObject, ["label", "title", "heading"]),
    type: normalizeFieldType(getString(fieldObject, ["type", "fieldType", "inputType", "returnType"])),
    required: getBoolean(fieldObject, ["required", "isRequired"]),
    placeholder: getString(fieldObject, ["placeholder", "hint"]),
    helperText: getString(fieldObject, ["helperText", "description", "note"]),
    options: options.length ? options : undefined,
    rows: getNumber(fieldObject, ["rows"]),
    min: getNumber(fieldObject, ["min", "minValue"]),
    max: getNumber(fieldObject, ["max", "maxValue"]),
    step: getNumber(fieldObject, ["step"]),
    icon: getString(fieldObject, ["icon", "iconName"]),
    inputMode: getString(fieldObject, ["inputMode"]),
    autoComplete: getString(fieldObject, ["autoComplete", "autocomplete"]),
  };
};

const normalizeConfig = (value: unknown): WebsiteFormConfig | undefined => {
  const configObject = asObject(value);
  if (!configObject) return undefined;

  const fields = asArray(configObject.fields)
    .map((field) => normalizeField(field))
    .filter((field): field is WebsiteFormField => !!field);

  return {
    formType: getString(configObject, ["formType", "formKey", "code", "name"]),
    formKey: getString(configObject, ["formKey", "formType", "code", "name"]),
    code: getString(configObject, ["code", "formKey", "formType", "name"]),
    name: getString(configObject, ["name", "title", "formTitle"]),
    formTitle: getString(configObject, ["formTitle", "title", "heading"]),
    subtitle: getString(configObject, ["subtitle", "subTitle", "description"]),
    description: getString(configObject, ["description", "body"]),
    successMessage: getString(configObject, ["successMessage", "success_message"]),
    submitButtonText: getString(configObject, ["submitButtonText", "buttonText", "submitText"]),
    fields,
  };
};

const collectConfigs = (payload: unknown) => {
  const queue: unknown[] = [payload];
  const configs: WebsiteFormConfig[] = [];
  const seen = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      for (const entry of current) queue.push(entry);
      continue;
    }

    const currentObject = asObject(current);
    if (!currentObject) continue;

    if (Array.isArray(currentObject.forms)) queue.push(currentObject.forms);
    if (Array.isArray(currentObject.items)) queue.push(currentObject.items);
    if (Array.isArray(currentObject.data)) queue.push(currentObject.data);

    const normalized = normalizeConfig(currentObject);
    if (normalized?.fields?.length) {
      const key = [normalized.formType, normalized.formKey, normalized.code, normalized.name]
        .filter(Boolean)
        .join("::");
      if (!seen.has(key)) {
        seen.add(key);
        configs.push(normalized);
      }
    }

    for (const value of Object.values(currentObject)) {
      if (Array.isArray(value) || (value && typeof value === "object")) {
        queue.push(value);
      }
    }
  }

  return configs;
};

const matchesKey = (config: WebsiteFormConfig, formKey: string) => {
  const normalizedKey = formKey.toLowerCase();
  const aliasMap: Record<string, string[]> = {
    city: ["city_form", "city"],
    city_form: ["city_form", "city"],
    center: ["center_form", "center"],
    centre: ["center_form", "center", "centre"],
    center_form: ["center_form", "center", "centre"],
    contact_us: ["contact_us", "contact"],
    contact: ["contact_us", "contact"],
    virtual_office: ["virtual_office", "virtualoffice"],
    meeting_room: ["meeting_room", "meetingroom"],
    apply_jobs: ["apply_jobs"],
    apply_now: ["apply_now"],
  };
  const acceptedKeys = aliasMap[normalizedKey] || [normalizedKey];
  const keys = [config.formType, config.formKey, config.code, config.name]
    .filter((value): value is string => !!value)
    .map(v => v.toLowerCase());

  return keys.some((value) => acceptedKeys.includes(value));
};

const formsDataCache = new Map<string, WebsiteFormConfig[]>();
const formsRequestCache = new Map<string, Promise<WebsiteFormConfig[]>>();

const getFormsCacheKey = (formType?: string) =>
  (formType || "__all__").trim().toLowerCase();

export const fetchWebsiteForms = async (formType?: string) => {
  const cacheKey = getFormsCacheKey(formType);

  const cachedData = formsDataCache.get(cacheKey);
  if (cachedData) return cachedData;

  const inFlightRequest = formsRequestCache.get(cacheKey);
  if (inFlightRequest) return inFlightRequest;

  const requestPromise = (async () => {
    // GET works in current backend environment and avoids POST 404 noise.
    try {
      const response = await apiClient.get<FormsApiResponse>(API_ENDPOINTS.getForms, {
        params: formType ? { formType } : undefined,
      });
      const item = response.data?.data?.item ?? response.data?.data?.items ?? response.data;
      const configs = collectConfigs(item);
      if (configs.length > 0) return configs;
    } catch (error) {
      // fall through to POST fallback
    }

    try {
      const response = await apiClient.post<FormsApiResponse>(
        API_ENDPOINTS.getForms,
        formType ? { formType } : {},
      );
      const item = response.data?.data?.item ?? response.data?.data?.items ?? response.data;
      return collectConfigs(item);
    } catch (error) {
      return [];
    }
  })();

  formsRequestCache.set(cacheKey, requestPromise);

  try {
    const configs = await requestPromise;
    if (configs.length > 0) {
      formsDataCache.set(cacheKey, configs);
    }
    return configs;
  } finally {
    formsRequestCache.delete(cacheKey);
  }
};

export const getWebsiteFormConfig = (
  forms: WebsiteFormConfig[] | undefined,
  formKey: string,
) => {
  return forms?.find((config) => matchesKey(config, formKey));
};

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
