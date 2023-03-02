import Axios from "./caller.service";

let companyUpdate = (credentials) => {
  return Axios.put("/api/company/update", credentials);
};

let offerCreation = (credentials) => {
  return Axios.post("/api/company/offers/create", credentials);
};

let getOffersCompany = (id) => {
  return Axios.get("/api/public/company/getOpenOffers/" + id);
};

let getCompany = () => {
  return Axios.get("/api/getCompany");
};

let getFilteredCompanies = (filters) => {
  return Axios.post("/api/public/filterCompanies", filters);
};

let getCompanyById = (id) => {
  return Axios.get("/api/public/company/" + id);
};

let getCompanyChatRoom = () => {
  return Axios.get("/api/company/chatrooms");
};
let getChatRoomFromId = (id) => {
  return Axios.get("/api/company/chatroom/messages/" + id);
};

let updateOffer = (id, offer) => {
  return Axios.put("/api/company/offers/update/" + id, offer);
};

let closeOffer = (id) => {
  return Axios.patch("/api/company/offer/closedStatus/" + id);
};

let updateOfferToDone = (id) => {
  return Axios.patch("/api/company/offer/doneStatus/" + id);
};

let progressAdmission = (id) => {
  return Axios.post("/api/company/admissionInProgress/" + id);
};

let acceptAdmission = (id) => {
  return Axios.post("/api/company/admissionAccepted/" + id);
};

let rejectAdmission = (id) => {
  return Axios.post("/api/company/admissionRejected/" + id);
};

export const companyService = {
  companyUpdate,
  offerCreation,
  getOffersCompany,
  getFilteredCompanies,
  getCompany,
  getCompanyById,
  updateOffer,
  closeOffer,
  updateOfferToDone,
  getCompanyChatRoom,
  getChatRoomFromId,
  progressAdmission,
  acceptAdmission,
  rejectAdmission,
};
