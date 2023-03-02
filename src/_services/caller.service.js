import axios from "axios";
import { accountService } from "@/_services";

const Axios = axios.create({
  // baseURL: "http://192.168.0.146:8080",
  baseURL: "http://localhost:8081",
  withCredentials: false,
});

/**
 * Interceptor pour injection token
 */
Axios.interceptors.request.use((request) => {
  // Si connecté on ajoute le token dans l'entête
  if (accountService.isLogged()) {
    request.headers.Authorization = "Bearer " + accountService.getToken();
  }

  return request;
});

/**
 * Interceptor des réponses de l'API
 */
// Axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status == 401) {
//       accountService.logout();
//       router.push("/login");
//     }
//   }
// );

export default Axios;
