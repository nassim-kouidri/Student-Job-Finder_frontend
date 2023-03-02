<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import Cookies from "js-cookie";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiGithub,
  mdiMapMarker,
  mdiWeb,
  mdiLink,
  mdiPhone,
} from "@mdi/js";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";

import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import { accountService } from "@/_services";

let company_values = JSON.parse(Cookies.get("account_cookies"));

const form = reactive({
  role: "company",
  email: company_values.email,
  password: company_values.password,
  name: company_values.name,
  creationDate: company_values.creationDate,
  description: company_values.description,
  sector: company_values.sector,
  address: {
    city: "",
    zipcode: null,
  },
  website: "",
  socialMedia: "",
  phoneNumber: null,
});

const account = reactive({
  email: company_values.email,
  password: company_values.password,
});

const router = useRouter();

const isLoading = ref(false);

const submit = () => {
  isLoading.value = true;
  accountService
    .registerCompany(form)
    .then((res) => {
      isLoading.value = false;
      router.push("/register/verify-step");
    })
    .catch((err) => ((isLoading.value = false), console.log(err)));
};

const revenir = () => {
  router.push("/register/company-step-2");
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <CardBoxComponentTitle
          title="Étape 3"
          underlined
          centered
        ></CardBoxComponentTitle>
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <FormField label="Emplacement" required>
              <FormControl
                v-model="form.address.city"
                :icon="mdiMapMarker"
                type="text"
                placeholder="Ville"
                required
              />
              <FormControl
                v-model="form.address.zipcode"
                :icon="mdiMapMarker"
                type="number"
                placeholder="Code postal"
                required
              />
            </FormField>
            <FormField label="Site web">
              <FormControl v-model="form.website" :icon="mdiWeb" type="text" />
            </FormField>
            <FormField label="Réseau social">
              <FormControl
                v-model="form.socialNetwork"
                :icon="mdiLink"
                type="text"
              />
            </FormField>
            <FormField label="Télephone" required>
              <FormControl
                v-model="form.phoneNumber"
                :icon="mdiPhone"
                type="number"
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
