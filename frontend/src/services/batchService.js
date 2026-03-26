import { api, handleApiError } from "./api";

export async function addBatch(batchNumber) {
  try {
    const res = await api.post("/", { batchNumber });
  } catch (error) {
    return handleApiError(error, "Error adding batches");
  }
}

export async function getAllBatch(status) {
  try {
    const res = await api.get(`/all/?status=${status}`);
  } catch (error) {
    return handleApiError(error, "Error fetching batches");
  }
}
