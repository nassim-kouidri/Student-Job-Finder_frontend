import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Accueil",
    },
    path: "/",
    name: "home",
    component: Home,
  },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profil",
    },
    path: "/profile",
    name: "student profile",
    component: () => import("@/views/StudentProfileView.vue"),
  },
  {
    meta: {
      title: "DashBoard",
    },
    path: "/company_dashboard",
    name: "company dashboard",
    component: () => import("@/views/CompanyDashboardView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Connexion",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Inscription",
    },
    name: "register",
    path: "/register",
    children: [
      {path: "", component: () => import("@/views/Register/RegisterView.vue")},
      {path: "student-step-1", component: () => import("@/views/Register/Student/EtudiantStep1.vue")},
      {path: "student-step-2", component: () => import("@/views/Register/Student/EtudiantStep2.vue")},
      {path: "company-step-1", component: () => import("@/views/Register/Company/EntrepriseStep1.vue")},
      {path: "company-step-2", component: () => import("@/views/Register/Company/EntrepriseStep2.vue")},
      {path: "company-step-3", component: () => import("@/views/Register/Company/EntrepriseStep3.vue")},
    ]
  },
  /*
  {
    meta: {
      title: "Inscription Étudiant 1",
    },
    path: "/student-step-1",
    name: "student-step-1",
    component: () => import("@/views/Register/Student/EtudiantStep1.vue"),
  },
  {
    meta: {
      title: "Inscription Étudiant 2",
    },
    path: "/student-step-2",
    name: "student-step-2",
    component: () => import("@/views/Register/Student/EtudiantStep2.vue"),
  },
  {
    meta: {
      title: "Inscription Entreprise 1",
    },
    path: "/company-step-1",
    name: "company-step-1",
    component: () => import("@/views/Register/Company/EntrepriseStep1.vue"),
  },
  {
    meta: {
      title: "Inscription Entreprise 2",
    },
    path: "/company-step-2",
    name: "company-step-2",
    component: () => import("@/views/Register/Company/EntrepriseStep2.vue"),
  },
  {
    meta: {
      title: "Inscription Entreprise 3",
    },
    path: "/company-step-3",
    name: "company-step-3",
    component: () => import("@/views/Register/Company/EntrepriseStep3.vue"),
  },
  */
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    meta: {
      title: "RegisterCompany",
    },
    path: "/registerCompany",
    name: "registerCompany",
    component: () => import("@/views/RegisterCompany.vue"),
  },

  {
    meta: {
      title: "OfferCreationStep1",
    },
    path: "/OfferCreationStep1",
    name: "OfferCreationStep1",
    component: () =>
      import("@/views/OfferCreationSteps/OfferCreationStep1.vue"),
  },
  {
    meta: {
      title: "OfferCreationStep2",
    },
    path: "/OfferCreationStep2",
    name: "OfferCreationStep2",
    component: () =>
      import("@/views/OfferCreationSteps/OfferCreationStep2.vue"),
  },
  {
    meta: {
      title: "OfferCreationStep3",
    },
    path: "/OfferCreationStep3",
    name: "OfferCreationStep3",
    component: () =>
      import("@/views/OfferCreationSteps/OfferCreationStep3.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
