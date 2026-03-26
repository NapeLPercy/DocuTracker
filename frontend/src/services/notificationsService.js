import { api, handleApiError } from "./api.js";

//used to add notification
export async function addNotification(text, persalNumber) {
  try {

    const res = await api.post("/notifications/",{text,persalNumber});
    return res;
  } catch (error) {
    return handleApiError(error, "Error adding a notification");
  } 
}

//used fetch all notifications
export async function getNotifications() {
  try {
    const res = await api.get("/notifications/");
    return res;
  } catch (error) {
    return handleApiError(error, "Error fetching all notifications");
  } 
}


//used to read a single notification
export async function updateNotification(notificationId) {
  try {
    const res = await api.patch(`/notifications/${notificationId}`);
    return res;
  } catch (error) {
    return handleApiError(error, "Error viewing a notification");
  } 
}

//used to read all notifications
export async function updateNotifications() {
  try {
    const res = await api.patch("/notifications/all");
    return res;
  } catch (error) {
    return handleApiError(error, "Error viewing all notifications");
  } 
}
