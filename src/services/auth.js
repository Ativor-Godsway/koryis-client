import API from "./api";

// Register parent with multiple children
export const registerParent = async ({
  parentName,
  email,
  password,
  children,
}) => {
  try {
    const response = await API.post("/auth/register", {
      parentName,
      email,
      password,
      children,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || "Registration failed";
  }
};

// Register parent with multiple children
export const registerSchool = async ({
  schoolName,
  email,
  address,
  password,
  teachers,
  city,
  schoolType,
}) => {
  try {
    const response = await API.post("/auth/register-school", {
      schoolName,
      email,
      address,
      password,
      teachers,
      city,
      schoolType,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || "Registration failed";
  }
};

// Login
export const login = async ({ code, password }) => {
  try {
    const response = await API.post("/auth/login", { code, password });

    const { token, role, user } = response.data;

    // Save token (optional — depends on your auth logic)
    localStorage.setItem(`${role}-token`, token);

    // Save user data separately based on role
    if (role === "student") {
      localStorage.setItem("student", JSON.stringify(user));
    } else if (role === "teacher") {
      localStorage.setItem("teacher", JSON.stringify(user));
    } else if (role === "parent") {
      localStorage.setItem("parent", JSON.stringify(user));
    } else if (role === "admin") {
      localStorage.setItem("admin", JSON.stringify(user));
    }

    // You may still store role if needed
    localStorage.setItem("userType", role);

    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || "Login failed";
  }
};

// Change Password
export const changePassword = async ({ code, oldPassword, newPassword }) => {
  try {
    const response = await API.post("/auth/change-password", {
      code,
      oldPassword,
      newPassword,
    });

    return response.data; // { message: "Password changed successfully" }
  } catch (error) {
    throw error.response?.data?.message || "Change password failed";
  }
};

// Logout
export const logout = (role) => {
  if (!role) return;

  localStorage.removeItem(`${role}-token`);
  localStorage.removeItem(role);

  // If the currently active userType matches, clear it too
  const current = localStorage.getItem("userType");
  if (current === role) {
    localStorage.removeItem("userType");
  }
};
