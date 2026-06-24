import { api, handleApiError} from "./api";

export async function chat(question) {
  try {
    const res = await api.post("/chatbot", { question });
    return res;
  } catch (error) {
    return handleApiError(error, "Error chating to a bot");
  }
}