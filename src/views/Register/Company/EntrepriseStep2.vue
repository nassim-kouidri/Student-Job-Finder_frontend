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
  "Business development",
  "Marketing",
  "Sales",
  "Industrial",
  "Audit",
];

const company = reactive({
  name: "",
  creationDate: null,
  sector: selectOptions[0],
  description: "",
});

let company_values = JSON.parse(Cookies.get("account_cookies"));

const router = useRouter();

const submit = () => {
  Cookies.set(
    "account_cookies",
    JSON.stringify({
      role: company_values.role,
      email: company_values.email,
      password: company_values.password,
      name: company.name,
      date: company.date,
      department: company.department,
      description: company.description,
    })
  );
  router.push("/register/company-step-3");
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      ------{{ company.sector }}
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <CardBoxComponentTitle title="Étape 2"></CardBoxComponentTitle>
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <FormField label="Nom de l'entreprise">
              <FormControl v-model="company.name" />
            </FormField>

            <FormField label="Date de création">
              <FormControl v-model="company.creationDate" type="date" />
            </FormField>

            <FormField label="Secteur d'activité">
              <FormControl v-model="company.sector" :options="selectOptions" />
            </FormField>

            <FormField label="Description de l'entreprise">
              <FormControl
                type="textarea"
                placeholder=""
                v-model="company.description"
              />
            </FormField>
            <BaseButton type="submit" color="info" label="Suivant" />
            <RouterLink to="/company-step-1"
              ><div class="mt-4 underline text-center">
                étape précédente
              </div></RouterLink
            >
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
