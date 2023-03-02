import {
  mdiAccount,
  mdiLogout,
  mdiTextBoxCheck,
  mdiBookmark,
  mdiEmail,
} from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "Mon profil",
        to: "/student",
      },
      {
        icon: mdiTextBoxCheck,
        label: "Mes candidatures",
        to: "/student/admissions",
      },
      {
        icon: mdiBookmark,
        label: "Mes offres",
        to: "/student/favoffers",
      },
      {
        icon: mdiEmail,
        label: "Messagerie",
        to: "/student/chat",
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: "Se déconnecter",
        isLogout: true,
      },
    ],
  },
];
