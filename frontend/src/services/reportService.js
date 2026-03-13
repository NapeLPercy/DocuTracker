import { api, handleApiError } from "./api";

export async function getReports() {
  try {
    const res = await api.get(`/report/`);
    return res;
  } catch (error) {
    return handleApiError(error,"Failed to fetch task reports");
  } finally {
  }
}
