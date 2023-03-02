import {
  mdiMonitorDashboard,
  mdiPlus,
  mdiFormatListBulleted,
  mdiEmail,
} from "@mdi/js";

export default [
  {
    to: "/company",
    icon: mdiMonitorDashboard,
    label: "Dashboard",
  },
  {
    to: "/company/offer-step-1",
    icon: mdiPlus,
    label: "Créer une offre",
  },
  {
    to: "/company/offer",
    icon: mdiFormatListBulleted,
    label: "Vos offres",
  },
  {
    to: "/company/chatcompany",
    icon: mdiEmail,
    label: "Messagerie",
  },
];
