<script setup>
import { reactive, ref } from "vue";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiGithub,
  mdiMapMarkerRadius,
  mdiCalendarRange,
} from "@mdi/js";
import { useRouter } from "vue-router";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
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
import EntrepriseStep1 from "../Register/Company/EntrepriseStep1.vue";
import EntrepriseStep3 from "../Register/Company/EntrepriseStep3.vue";
import Cookies from "js-cookie";
import LayoutCompany from "../../layouts/LayoutCompany.vue";

const router = useRouter();

const selectOptionsSector = ["Marketing", "Business development", "Sales"];
const selectOptionsContrat = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];
const selectOptionsRemoteWork = ["Oui", "Non"];

const form = reactive({
  title: "",
  sector: selectOptionsSector[0],
  contract: selectOptionsContrat[0],
  remoteWork: selectOptionsRemoteWork[0],
  nbrPlaces: null,
  salary: null,
  address: "",
  city: "",
  zipCode: "",
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
      address: form.address,
      city: form.city,
      zipCode: form.zipCode,
      startDate: form.startDate,
      endDate: form.endDate,
    })
  );
  router.push("/OfferCreationStep2");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <SectionTitleLineWithButton title="Création offre 1" main>
      </SectionTitleLineWithButton>

      <CardBox is-form @submit.prevent="submit">
        -----{{ form.title }}

        <FormField label="Titre de l'offre">
          <FormControl
            placeholder="Dévelopeur web fullstack"
            on="mdiAccount"
            v-model="form.title"
            required
          />
        </FormField>

        <div class="flex justify-between">
          <FormField label="Secteur de travail" class="w-5/12">
            <FormControl
              v-model="form.sector"
              :options="selectOptionsSector"
              required
            />
          </FormField>

          <FormField label="Type de contrat" class="w-5/12">
            <FormControl
              v-model="form.contract"
              :options="selectOptionsContrat"
              required
            />
          </FormField>
        </div>

        <div class="flex justify-between">
          <FormField label="Teletravail" class="w-5/12">
            <FormControl
              v-model="form.remoteWork"
              :options="selectOptionsRemoteWork"
              required
            />
          </FormField>

          <FormField label="Nombre de candidat souhaité" class="w-5/12">
            <FormControl :icon="mdiAccount" v-model="form.nbrPlaces" required />
          </FormField>
        </div>

        <FormField label="Salaire approximatif">
          <FormControl
            placeholder="€€"
            :icon="mdiAccount"
            v-model="form.salary"
            required
          />
        </FormField>
        <BaseDivider />

        <FormField label="Lieu de travail">
          <div class="flex justify-between">
            <FormControl
              placeholder="adresse"
              :icon="mdiMapMarkerRadius"
              v-model="form.address"
              required
            />
            <FormControl
              placeholder="ville"
              :icon="mdiMapMarkerRadius"
              v-model="form.city"
              required
            />
            <FormControl
              placeholder="code postal"
              :icon="mdiMapMarkerRadius"
              v-model="form.zipCode"
              required
            />
          </div>
        </FormField>
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
            <!-- <BaseButton
              type="reset"
              color="info"
              outline
              label="Revenir en arrière"
            /> -->
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
