import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cloud.isprout.in/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

// Upload document API
export const uploadDocument = async (file: File, code: string) => {
  const formData = new FormData();
  formData.append("attachments", file);
  formData.append("code", code);

  const response = await axios.put(
    "https://cloud.isprout.in/api/v2/core/site/forms/upload-documents",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default apiClient;
