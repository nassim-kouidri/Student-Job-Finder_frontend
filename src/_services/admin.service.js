import Axios from "./caller.service";

let getAllStudents = () => {
  return Axios.get("/api/admin/getAllStudents");
};

let getAllCompanies = () => {
  return Axios.get("/api/admin/getAllCompanies");
};

let getAllOffers = () => {
  return Axios.get("/api/admin/getAllOffers");
};

let updateStudentStatus = (id) => {
  return Axios.patch("/api/admin/updateStudentStatus/" + id);
};

let updateCompanyStatus = (id) => {
  return Axios.patch("/api/admin/updateCompanyStatus/" + id);
};

let updateOfferStatus = (id) => {
  return Axios.patch("/api/admin/offers/banStatus/" + id);
};

let getAllMessages = () => {
  return Axios.get("/api/admin/getContactSite");
};

let updateStatusArchivedContact = (id) => {
  return Axios.post("/api/public/contactSiteStatus/" + id);
};

export const adminService = {
  getAllStudents,
  getAllCompanies,
  getAllOffers,
  updateStudentStatus,
  updateCompanyStatus,
  updateOfferStatus,
  getAllMessages,
  updateStatusArchivedContact,
};
