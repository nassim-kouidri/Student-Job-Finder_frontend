import {
  mdiMonitorDashboard,
  mdiAccount,
  mdiDomain,
  mdiBriefcase,
} from "@mdi/js";

export default [
  {
    to: "/admin",
    icon: mdiMonitorDashboard,
    label: "Dashboard",
  },
  {
    to: "/admin/students",
    icon: mdiAccount,
    label: "Utilisateurs",
  },
  {
    to: "/admin/companies",
    icon: mdiDomain,
    label: "Entreprises",
  },
  {
    to: "/admin/offers",
    icon: mdiBriefcase,
    label: "Offres",
  },
];
