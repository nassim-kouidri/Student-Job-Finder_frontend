import {
  mdiAccount,
  mdiLogout,
} from "@mdi/js";



export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "Profil",
        to: "/profile",
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
