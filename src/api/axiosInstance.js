import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const permissions = user?.userPermissions || {};
     
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if(user){
       if (user.id) {
        config.headers["X-USER-ID"] = user.id;
        }

        if (user.username) {
        config.headers["X-USERNAME"] = user.username;
        }

        if (user.role) {
        config.headers["X-ROLE"] = user.role;
        }
    }

    return config;
});

export default axiosInstance;