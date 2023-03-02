import Axios from "./caller.service";

let addInformationStudent = (credentials) => {
  return Axios.post("/api/public/addInformationStudent", credentials);
};

let updateStudent = (credentials) => {
  return Axios.put("/api/student/update", credentials);
};

let editPasswordStudent = (credentials) => {
  return Axios.put("/api/student/changePassword", credentials);
};

let getStudent = () => {
  return Axios.get("/api/getStudent");
};

let getStudentById = (id) => {
  return Axios.get("/api/public/student/" + id);
};
let deleteStudent = () => {
  return Axios.delete("/api/student/delete");
};

let addFavOffer = (id) => {
  return Axios.post("/api/student/offer/addFavorite/" + id);
};

let getFavOffer = () => {
  return Axios.get("/api/student/myFavOffers");
};

let getStudentChatRoom = () => {
  return Axios.get("/api/student/chatrooms");
};
let getChatRoomFromId = (id) => {
  return Axios.get("/api/student/chatroom/messages/" + id);
};
let getAdmissions = () => {
  return Axios.get("/api/student/admissions");
};

let getAdmissionById = (id) => {
  return Axios.get("/api/student/admission/" + id);
};

export const studentService = {
  addInformationStudent,
  updateStudent,
  getStudentChatRoom,
  getChatRoomFromId,
  getStudent,
  editPasswordStudent,
  getStudentById,
  deleteStudent,
  addFavOffer,
  getFavOffer,
  getAdmissions,
  getAdmissionById,
};
