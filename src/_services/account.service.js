import Axios from "./caller.service";
import Cookies from "js-cookie";

let login = (credentials) => {
  return Axios.post("/api/public/login", credentials);
};

let getStudent = (credentials) => {
  return Axios.post("/api/public/getStudent", credentials);
};

let verifyUser = (role, code, email) => {
  return Axios.post("/api/public/" + role + "/verify/" + code, email);
};
let verifyUserReset = (role, code, email) => {
  return Axios.get("/public/" + role + "/verify/reset" + code, email);
};

let GetChatFromBack = () => {
  return Axios.get("/chat.html");
};

let getNameCompany = (credentials) => {
  localStorage.setItem("nameCompany", credentials);
};

let registerStudent = (credentials) => {
  return Axios.post("/api/public/register/student", credentials);
};

let registerCompany = (credentials) => {
  return Axios.post("/api/public/register/company", credentials);
};

let getAllCompanies = () => {
  return Axios.get("/api/public/companies");
};

let getCompany = (id) => {
  return Axios.get("/api/public/company/" + id);
};

let getToken = () => {
  return Cookies.get("token");
};

let getUserInfo = () => {
  return Cookies.get("user");
};

let createChatRoom = (idCompany) => {
  return Axios.post("/api/student/newChat/" + idCompany);
};

let saveImage = (image) => {
  localStorage.setItem("image", image);
};
let saveImagesCompany = (logo, banner) => {
  localStorage.setItem("logo", logo);
  localStorage.setItem("banner", banner);
};
let saveNames = (userName, userFname) => {
  localStorage.setItem("userName", userName);
  localStorage.setItem("userFname", userFname);
};

let saveUser = (user) => {
  Cookies.set("user", user);
};

let saveRole = (role) => {
  Cookies.set("userIsLogged", true);
  Cookies.set("role", role);
};

let saveId = (id) => {
  Cookies.set("id", id);
};

let saveOffer = (offers) => {
  Cookies.set("offers", offers);
};

let deleteUser = () => {
  Cookies.remove("user");
};

let saveToken = (key, token, time) => {
  Cookies.set(key, token, { expires: time });
};

let logout = () => {
  Cookies.remove("token");
  Cookies.remove("userIsLogged");
  Cookies.remove("user");
};

let isLogged = () => {
  return Cookies.get("userIsLogged");
};

let contact = (form) => {
  return Axios.post("/api/public/contactSite", form);
};

export const accountService = {
  login,
  verifyUser,
  registerStudent,
  registerCompany,
  saveUser,
  saveRole,
  saveId,
  saveNames,
  saveImagesCompany,
  saveOffer,
  saveImage,
  getAllCompanies,
  getCompany,
  deleteUser,
  GetChatFromBack,
  logout,
  createChatRoom,
  verifyUserReset,
  getUserInfo,
  saveToken,
  getToken,
  isLogged,
  getNameCompany,
  contact,
};
