<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

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

const company = reactive({
  role: "company",
  name: "",
  creationDate: null,
  sector: selectOptions[0],
  description: "",
});

let company_values = JSON.parse(Cookies.get("account_cookies"));

const router = useRouter();

const isLoading = ref(false);

const submit = () => {
  isLoading.value = true;
  Cookies.set(
    "account_cookies",
    JSON.stringify({
      role: "company",
      email: company_values.email,
      password: company_values.password,
      name: company.name,
      creationDate: company.creationDate,
      sector: company.sector,
      description: company.description,
    })
  );
  isLoading.value = false;
  router.push("/register/company-step-3");
};

const revenir = () => {
  router.push("/register/company-step-1");
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <CardBoxComponentTitle
          title="Étape 2"
          underlined
          centered
        ></CardBoxComponentTitle>
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <FormField label="Nom de l'entreprise" required>
              <FormControl v-model="company.name" required />
            </FormField>

            <FormField label="Date de création" required>
              <FormControl
                v-model="company.creationDate"
                type="date"
                required
              />
            </FormField>

            <FormField label="Secteur d'activité" required>
              <FormControl
                v-model="company.sector"
                :options="selectOptions"
                required
              />
            </FormField>

            <FormField label="Description de l'entreprise" required>
              <FormControl
                type="textarea"
                placeholder=""
                v-model="company.description"
                required
              />
            </FormField>
            <BaseButton
              type="submit"
              :disabled="isLoading"
              :isLoading="isLoading"
              color="info"
              label="Suivant"
            />
            <BaseDivider />
            <BaseButton
              v-on:click="revenir"
              color="infligthDarko"
              label="Revenir"
            />
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
