import Axios from "./caller.service";

let getAllOffers = () => {
  return Axios.get("/api/public/offers");
};

let applyOffer = (OfferId, answers) => {
  return Axios.post("/api/student/offer/admission/" + OfferId, answers);
};

let getFilteredOffers = (filters) => {
  return Axios.post("/api/public/filterOffers", filters);
};

export const offerService = {
  getAllOffers,
  applyOffer,
  getFilteredOffers,
};
