import axios from "axios";

const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWQwZDg1MTk2YjMxNWI0OGRjOGNjZGM2ZTNkYWEyNyIsInN1YiI6IjYzOWU2MDQ3OGRkYzM0MDBiOGU0YzE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H9PqMRlKFeIw92yYHFDn4tSkkNsJBSZLdNQHvcCcO10";

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=utf-8",
    },
});

apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;
