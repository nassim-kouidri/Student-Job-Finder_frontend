import Axios from "./caller.service";
import Cookies from "js-cookie";

let login = (credentials) => {
  return Axios.post("/api/public/login", credentials);
};

let registerStudent = (credentials) => {
  return Axios.post("/api/public/register/student", credentials);
};
let registerCompany = (credentials) => {
  return Axios.post("/api/public/register/company", credentials);
};

let getToken = () => {
  // return localStorage.getItem("token");
  return Cookies.get("token");
};

let saveToken = (key, token, time) => {
  Cookies.set(key, token, { expires: time });
  // sessionStorage.setItem(token);
  // localStorage.setItem("token", token);
};

let logout = () => {
  Cookies.remove("token");
  // sessionStorage.removeItem(token);
  // localStorage.removeItem("token");
};

let isLogged = () => {
  let token = Cookies.get("token");
  return !!token;
};

export const accountService = {
  login,
  registerStudent,
  registerCompany,
  logout,
  saveToken,
  getToken,
  isLogged,
};
