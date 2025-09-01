import API from "./api";

export const registerUser = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
