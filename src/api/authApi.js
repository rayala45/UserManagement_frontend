import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
};