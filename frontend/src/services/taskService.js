import { api, handleApiError } from "./api";

export async function addTask(data) {
  try {
    const res = await api.post(`/task/assign`, data);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to add task");
  }
}

//get my tasks
export async function getAllTasks(persal, role) {
  try {
    const res = await api.get(`/task?persal=${persal}&role=${role}`);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to get tasks");
  }
}

//get all users tasks
export async function getAllUsersTasks() {
  try {
    const res = await api.get(`/task/all`);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to get all users tasks");
  }
}

//start task
export async function startTask(taskId) {
  try {
    const res = await api.patch(`/task/${taskId}/start`);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to start task");
  }
}

//end task
export async function endTask(taskId) {
  try {
    const res = await api.patch(`/task/${taskId}/end`);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to end task");
  }
}

//update task status
export async function updateTaskStatus(id,status) {
  try {
    const res = await api.patch(`/task/${id}/status`, {status} );
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to update task status");
  }
}

//report task
export async function reportTask(taskId, data) {
  try {
    const res = await api.post(`/task/${taskId}/report`, { data });
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to report task");
  }
}
