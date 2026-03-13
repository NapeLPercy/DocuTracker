import { api, handleApiError } from "./api";
//login user
export async function loginUser(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);

    return {
      success: true,
      message: res.data?.message || "Login successful",
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return handleApiError(error, "Failed to login");
  }
}

//add user
export async function addUser(userData) {
  try {
    const res = await api.post("/auth/user", userData);

    return {
      success: true,
      message: res.data?.message || "User added successfully",
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return handleApiError(error, "Failed to add user");
  }
}

//get users
export async function getUsers() {
  try {
    const res = await api.get("/auth/users");
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to get users");
  }
}

//delete user

export async function deleteUser(persal) {
  console.log("In the delet user", persal);
  try {
    const res = await api.delete(`/auth/user/${persal}`);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to delete user");
  }
}

//edit role
export async function editRole(persal, data) {
  try {
    const res = await api.patch(`/auth/user/${persal}`, data);
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to delete user");
  }
}


//get workers

export async function getWorkers(role){
    try{
      const res = await api.get(`/auth/workers?role=${role}`);
      return res;
    }
    catch(error){
      return handleApiError(error,"Failed to fetch workers");
    }
}