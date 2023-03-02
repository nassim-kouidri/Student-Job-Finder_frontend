<script setup>
import { reactive, ref } from "vue";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiGithub,
  mdiFileDocumentEditOutline,
  mdiMapMarkerRadius,
  mdiCalendarRange,
  mdiRayStartVertexEnd,
  mdiDomain,
  mdiSchool,
  mdiWallet,
  mdiCurrencyEur,
  mdiAccountGroup,
  mdiWebcam,
} from "@mdi/js";
import { useRouter } from "vue-router";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import ProgressBar from "../../components/ProgressBar.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";

import EntrepriseStep1 from "../Register/Company/EntrepriseStep1.vue";
import EntrepriseStep3 from "../Register/Company/EntrepriseStep3.vue";
import Cookies from "js-cookie";
import LayoutCompany from "../../layouts/LayoutCompany.vue";

const router = useRouter();

const selectOptionsSector = [
  "Administratif",
  "Aéronautique et Transport aérien",
  "Agriculture",
  "Agroalimentaire",
  "Architecte - BTP - Urbanisme",
  "Armée - Sécurité",
  "Hardware, software",
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
  "Evenemmentiel",
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
const selectOptionsContrat = ["CDI", "CDD", "STAGE", "ALTERNANCE"];
const selectOptionsRemoteWork = [
  {
    label: "Oui",
    value: true,
  },
  {
    label: "Non",
    value: false,
  },
];
const selectOptionsLevel = [
  {
    label: "BAC",
    value: "BAC",
  },
  {
    label: "BAC + 1",
    value: "BAC+1",
  },
  {
    label: "BAC + 2",
    value: "BAC+2",
  },
  {
    label: "BAC + 3",
    value: "BAC+3",
  },
  {
    label: "BAC + 4",
    value: "BAC+4",
  },
  {
    label: "BAC + 5",
    value: "BAC+5",
  },
];

const form = reactive({
  title: "",
  sector: selectOptionsSector[14],
  contract: selectOptionsContrat[0],
  remoteWork: "",
  nbrPlaces: null,
  salary: null,
  address: {
    city: "",
    zipcode: "",
  },
  level: "",
  startDate: "",
  endDate: "",
});

const submit = () => {
  Cookies.set(
    "offerCreation_cookies",
    JSON.stringify({
      title: form.title,
      sector: form.sector,
      contract: form.contract,
      remoteWork: form.remoteWork,
      nbrPlaces: form.nbrPlaces,
      salary: form.salary,
      address: {
        city: form.address.city,
        zipcode: form.address.zipcode,
      },
      level: form.level,
      startDate: form.startDate,
      endDate: form.endDate,
    })
  );
  router.push("/company/offer-step-2");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBox is-form @submit.prevent="submit">
        <CardBoxComponentTitle title="Création d'une offre " centered />
        <ProgressBar :stepOne="true" :stepTwo="false" :step-three="false" />
        <FormField label="Titre de l'offre">
          <FormControl
            type="text"
            v-model="form.title"
            :maxLength="100"
            required
            underlined
          />
        </FormField>
        <div class="flex justify-between">
          <FormField label="Secteur d'activité" class="w-5/12">
            <FormControl
              :icon="mdiDomain"
              v-model="form.sector"
              :options="selectOptionsSector"
              required
            />
          </FormField>
          <FormField label="Type de contrat" class="w-5/12">
            <FormControl
              :icon="mdiFileDocumentEditOutline"
              v-model="form.contract"
              :options="selectOptionsContrat"
              required
            />
          </FormField>
        </div>

        <div class="flex justify-between">
          <FormField label="Télétravail" class="w-5/12">
            <FormControl
              :icon="mdiWebcam"
              v-model="form.remoteWork"
              :options="selectOptionsRemoteWork"
              required
            />
          </FormField>

          <FormField label="Nombre de poste disponible" class="w-5/12">
            <FormControl
              :icon="mdiAccountGroup"
              v-model="form.nbrPlaces"
              type="number"
              :min="1"
              required
            />
          </FormField>
        </div>
        <div class="flex justify-between">
          <FormField label="Salaire approximatif" class="w-5/12">
            <FormControl
              placeholder=""
              type="number"
              :icon="mdiWallet"
              v-model="form.salary"
              :min="0"
              required
            />
          </FormField>
          <FormField label="Niveau recherché" class="w-5/12">
            <FormControl
              :icon="mdiSchool"
              :options="selectOptionsLevel"
              v-model="form.level"
              required
            />
          </FormField>
        </div>
        <BaseDivider />
        <div class="flex justify-between">
          <FormField label="Ville" class="w-5/12">
            <FormControl
              :icon="mdiMapMarkerRadius"
              v-model="form.address.city"
              type="text"
              :maxLength="50"
              required
            />
          </FormField>
          <FormField label="Code postale" class="w-5/12">
            <FormControl
              :icon="mdiMapMarkerRadius"
              v-model="form.address.zipcode"
              type="number"
              :min="1000"
              :max="99000"
              required
            />
          </FormField>
        </div>
        <div class="flex justify-between">
          <FormField label="Date de début" class="w-5/12">
            <FormControl
              placeholder="jj/mm/aaaa"
              :icon="mdiCalendarRange"
              v-model="form.startDate"
              type="Date"
              required
            />
          </FormField>

          <FormField label="Date de fin" class="w-5/12">
            <FormControl
              placeholder="jj/mm/aaaa"
              :icon="mdiCalendarRange"
              v-model="form.endDate"
              type="Date"
              required
            />
          </FormField>
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Continuer" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
