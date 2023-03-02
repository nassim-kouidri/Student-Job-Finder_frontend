<script setup>
import { ref, onMounted, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiAccount,
  mdiAt,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiInformationOutline,
  mdiWeb,
  mdiLinkedin,
  mdiCalendar,
  mdiAccountGroup,
  mdiMapMarker,
  mdiPhone,
  mdiDomain,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";

import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import companyBanner from "@/assets/company2_banner.png";
import companyLogo from "@/assets/company_logo.jpeg";
import BaseIcon from "@/components/BaseIcon.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import Cookies from "js-cookie";
import moment from "moment";
import CardBoxCompanyVue from "../components/CardBoxCompany.vue";
import { companyService } from "@/_services";

const selectOptions = [
  "Administratif",
  "Paas, Cloud service",
  "Aéronautique et Transport aérien",
  "Architecte - BTP - Urbanisme",
  "Art - Culture",
  "Assurance",
  "Audiovisuel - Cinéma",
  "Automobile",
  "Banque - Finance",
  "Chimie - Biologie",
  "Commerce - Vente - Distribution",
  "Marketing - Communication",
  "Comptabilité - Economie - Gestion",
  "Droit - Justice",
  "Hôtellerie - Restauration - Tourisme",
  "Energie",
  "Immobilier",
  "Journalisme",
  "Industriel",
  "Informatique - Electronique - Numérique",
  "Ressourses Humaines",
  "Sport",
  "Santé - Paramédical",
  "Transport  Logistique",
  "Enseignement - Formation",
];

const handleImage = (e) => {
  const selectedImage = e.target.files[0];
  createBase64Image(selectedImage);
};

const createBase64Image = (fileObject) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    form.logo.image = e.target.result;
  };
  reader.readAsDataURL(fileObject);
};
const handleImageBanner = (e) => {
  const selectedImage = e.target.files[0];
  createBase64ImageBanner(selectedImage);
};

const createBase64ImageBanner = (fileObject) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    form.banner.image = e.target.result;
    console.log("eeeee --->", form.value.banner.image);
  };
  reader.readAsDataURL(fileObject);
};

// let user = JSON.parse(Cookies.get("user"));

let company = ref();
const form = reactive({
  name: "",
  description: "",
  email: "",
  presentation: "",
  address: {
    city: "",
    zipcode: "",
  },
  banner: {
    image:
      "https://img.freepik.com/photos-gratuite/fond-mur-blanc_24836-89.jpg?w=2000",
  },
  logo: {
    image:
      "https://img.freepik.com/photos-gratuite/fond-mur-blanc_24836-89.jpg?w=2000",
  },
  creationDate: "",
  socialMedia: "",
  sector: "",
  phoneNumber: "",
  linkedin: "",
  website: "",
  numberOfEmployees: null,
  averageEmployeeAge: null,
});

const remplissageform = (company) => {
  form.name = company.name;
  form.description = company.description;
  form.email = company.email;
  form.presentation = company.presentation;
  form.address.city = company.address.city;
  form.address.zipcode = company.address.zipcode;
  form.banner.image = company.banner.image;
  form.logo.image = company.logo.image;
  form.creationDate = company.creationDate;
  form.socialMedia = company.socialMedia;
  form.sector = company.sector;
  form.phoneNumber = company.phoneNumber;
  form.linkedin = company.linkedin;
  form.website = company.website;
  form.numberOfEmployees = company.numberOfEmployees;
  form.averageEmployeeAge = company.averageEmployeeAge;
};

onMounted(() => {
  companyService
    .getCompany()
    .then((res) => {
      company.value = res.data;
      remplissageform(company.value);
    })
    .catch((res) => console.log("probleme-->", res));
});

const invalidUpdate = ref(false);
const validUpdate = ref(false);
const isLoading = ref(false);

const submit = () => {
  isLoading.value = true;
  companyService
    .companyUpdate(form)
    .then((res) => {
      isLoading.value = false;
      validUpdate.value = true;
    })
    .catch((err) => {
      console.log(err);
      invalidUpdate.value = true;
      isLoading.value = false;
    });
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <SectionTitleLineWithButton
        title="Modifier les informations de l'entreprise"
        main
      />
      <CardBox is-form @submit.prevent="submit">
        <div class="relative">
          <img class="h-72 w-full mb-32" :src="form.banner.image" />
          <FormField class="absolute bottom-0 right-0">
            <FormFilePicker accept="image/*" @change="handleImageBanner" />
          </FormField>
        </div>

        <div class="-mt-60 flex flex-wrap bg-white h-56">
          <div class="w-2/12 overlfow-hidden mr-4">
            <div class="w-full relative">
              <img
                class="w-full border-8 border-white drop-shadow-md"
                :src="form.logo.image"
              />
              <FormField class="absolute bottom-0 right-0">
                <FormFilePicker accept="image/*" @change="handleImage" />
              </FormField>
            </div>
          </div>

          <div class="w-9/12 flex flex-col space-y-2 self-end">
            <div class="uppercase font-bold text-3xl">{{ form.name }}</div>
            <FormControl
              placeholder="Description"
              type="text"
              v-model="form.description"
              maxLength="255"
            />
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-3">
            <FormField label="Téléphone">
              <FormControl
                :icon="mdiPhone"
                type="text"
                v-model="form.phoneNumber"
              />
            </FormField>
            <FormField label="Adresse e-mail">
              <FormControl
                type="email"
                :icon="mdiAt"
                placeholder="Email"
                v-model="form.email"
                disabled
              />
            </FormField>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <FormField label="Ville">
              <FormControl
                :icon="mdiMapMarker"
                placeholder="Ville"
                type="text"
                v-model="form.address.city"
              />
            </FormField>
            <FormField label="Code postal">
              <FormControl
                :icon="mdiMapMarker"
                type="number"
                v-model="form.address.zipcode"
              />
            </FormField>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <FormField label="Nombre de collaborateurs">
              <FormControl
                :icon="mdiAccountGroup"
                type="number"
                v-model="form.numberOfEmployees"
              />
            </FormField>
            <FormField label="Âge moyen">
              <FormControl type="number" v-model="form.averageEmployeeAge" />
            </FormField>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <FormField label="Secteur d'activité">
              <FormControl :options="selectOptions" v-model="form.sector" />
            </FormField>
            <FormField label="Année de création">
              <FormControl
                type="date"
                :icon="mdiCalendar"
                placeholder="Année de création"
                v-model="form.creationDate"
              />
            </FormField>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <FormField label="Site web">
            <FormControl
              :icon="mdiWeb"
              placeholder="www.votresitweb.com"
              v-model="form.website"
            />
          </FormField>
          <FormField label="LinkedIn">
            <FormControl
              :icon="mdiLinkedin"
              v-model="form.linkedin"
              placeholder="www.votrelinkedIn.com"
            />
          </FormField>
        </div>
        <BaseDivider />
        <FormField label="Présentation">
          <FormControl
            type="textarea"
            v-model="form.presentation"
            placeholder="Présentation détaillée de l'entreprise"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Enregistrer"
              :isLoading="isLoading"
              :disabled="isLoading"
            />
          </BaseButtons>
        </template>
        <NotificationBarInCard
          v-show="invalidUpdate"
          color="danger"
          :icon="mdiAlertCircle"
          >Vos données n'ont pas été mise à jour
        </NotificationBarInCard>
        <NotificationBarInCard
          v-show="validUpdate"
          color="success"
          :icon="mdiAlertCircle"
          >Vos données ont bien été mise à jour
        </NotificationBarInCard>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
