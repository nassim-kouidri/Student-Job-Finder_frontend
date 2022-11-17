import Axios from "./caller.service";

let addInformationStudent = (credentials) => {
  return Axios.post("/api/public/addInformationStudent", credentials);
};

let editInformationStudent = (credentials) => {
  return Axios.put("/apui/editInformationStudent", credentials);
};

export const studentService = {
  addInformationStudent,
  editInformationStudent,
};
