import { createRouter, createWebHistory } from "vue-router";
// import { authGuard } from "@/_utils/auth-guard";
import Cookies from "js-cookie";

const authGuard = (to, from, next) => {
  if (Cookies.get("userIsLogged")) {
    let role = JSON.parse(Cookies.get("role"));
    if (role == "STUDENT") {
      if (to.name == "companydashboard") {
        next("/profile");
      } else {
        next();
      }
    } else {
      if (to.name == "companydashboard") {
        next();
      } else {
        next("/company");
      }
    }
  } else {
    if (to.name == "offers" || to.name == "companies") {
      next();
    } else {
      next("/login");
    }
  }
};

const routes = [
  {
    meta: {
      title: "Accueil",
    },
    path: "/",
    name: "home",
    children: [
      {
        name: "offers",
        path: "",
        component: () => import("@/views/HomeView.vue"),
        beforeEnter: authGuard,
      },
      {
        name: "companies",
        path: "companies",
        component: () => import("@/views/AllCompaniesView.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "companies/:id",
        name: "companie",
        component: () => import("@/views/CompanyView.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("@/views/ContactView.vue"),
      },
      {
        path: "aboutus",
        name: "aboutus",
        component: () => import("@/views/AboutUsView.vue"),
      },
    ],
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
      {
        name: "register-step-0",
        path: "",
        component: () => import("@/views/Register/RegisterView.vue"),
      },
      {
        path: "student-step-1",
        component: () => import("@/views/Register/Student/EtudiantStep1.vue"),
      },
      {
        path: "student-step-2",
        component: () => import("@/views/Register/Student/EtudiantStep2.vue"),
      },
      {
        path: "company-step-1",
        component: () => import("@/views/Register/Company/EntrepriseStep1.vue"),
      },
      {
        path: "company-step-2",
        component: () => import("@/views/Register/Company/EntrepriseStep2.vue"),
      },
      {
        path: "company-step-3",
        component: () => import("@/views/Register/Company/EntrepriseStep3.vue"),
      },
      {
        path: "verify-step",
        component: () => import("@/views/Register/VerifyView.vue"),
      },
    ],
  },
  {
    meta: {
      title: "Etudiant",
    },
    name: "student",
    path: "/student",
    children: [
      {
        name: "studentprofile",
        path: "",
        component: () => import("@/views/StudentProfileView.vue"),
        beforeEnter: authGuard,
      },
      {
        name: "favoffers",
        path: "favoffers",
        component: () => import("@/views/StudentFavOfferView.vue"),
        beforeEnter: authGuard,
      },
      {
        name: "admissions",
        path: "admissions",
        component: () => import("@/views/StudentCandidaciesView.vue"),
        beforeEnter: authGuard,
      },
      {
        name: "chat",
        path: "chat",
        component: () => import("@/views/ChatView.vue"),
        beforeEnter: authGuard,
      },
    ],
    beforeEnter: authGuard,
  },
  {
    meta: {
      title: "Admin",
    },
    name: "admin",
    path: "/admin",
    children: [
      {
        name: "adminprofile",
        path: "",
        component: () => import("@/views/Admin/AdminDashboardView.vue"),
      },
      {
        name: "studentsManagment",
        path: "students",
        component: () => import("@/views/Admin/AdminDashboardStudent.vue"),
      },
      {
        name: "companiesManagment",
        path: "companies",
        component: () => import("@/views/Admin/AdminDashboardCompany.vue"),
      },
      {
        name: "offersManagment",
        path: "offers",
        component: () => import("@/views/Admin/AdminDashboardOffer.vue"),
      },
      {
        path: "student/:id",
        component: () => import("@/views/AdminStudentView.vue"),
      },
    ],
  },
  {
    meta: {
      title: "Entreprise",
    },
    name: "company",
    path: "/company",
    children: [
      {
        name: "companydashboard",
        path: "",
        component: () => import("@/views/CompanyDashboardView.vue"),
      },
      {
        path: "offer-step-1",
        component: () =>
          import("@/views/OfferCreationSteps/OfferCreationStep1.vue"),
      },
      {
        path: "offer-step-2",
        component: () =>
          import("@/views/OfferCreationSteps/OfferCreationStep2.vue"),
      },
      {
        path: "offer-step-3",
        component: () =>
          import("@/views/OfferCreationSteps/OfferCreationStep3.vue"),
      },
      {
        path: "offer",
        component: () => import("@/views/CompanyOfferView.vue"),
      },
      {
        path: "edit",
        component: () => import("@/views/CompanyEditView.vue"),
      },
      {
        path: "candidate/:id",
        component: () => import("@/views/CompanyStudentView.vue"),
      },
      {
        path: "chatcompany",
        component: () => import("@/views/ChatViewCompany.vue"),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    meta: {
      title: "Entreprise",
    },
    path: "/companie/:id",
    name: "companie",
    component: () => import("@/views/CompanyView.vue"),
  },
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
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
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
    path: "/:pathMatch(.*)*",
    redirect: "/error",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
