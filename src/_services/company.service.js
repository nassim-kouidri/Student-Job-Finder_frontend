import Axios from "./caller.service";

let addInformationCompany = (credentials) => {
  return Axios.post("/auth/addInformationCompany", credentials);
};

let offerCreation = (credentials) => {
  return Axios.post("/offercreation", credentials);
};

export const companyService = {
  addInformationCompany,
  offerCreation,
};
