<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import { accountService } from "@/_services";

let company_values = JSON.parse(Cookies.get("account_cookies"));

const form = reactive({
  // role: company_values.role,
  email: company_values.email,
  password: company_values.password,
  name: company_values.name,
  creationDate: company_values.creationDate,

  description: company_values.description,
  adress: {
    city: "",
    zipcode: null,
  },
  sector: {
    name: company_values.sector,
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

function submit() {
  accountService
    .registerCompany(form)
    .then((res) => {
      accountService
        .login(account)
        .then((resLogin) => {
          accountService.saveToken("token", resLogin.data.token, 80000);
          router.push("/company_dashboard");
        })
        .catch((errLogin) => console.log(errLogin));
    })
    .catch((err) => console.log(err));
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <CardBoxComponentTitle title="Étape 3"></CardBoxComponentTitle>
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <FormField label="Emplacement">
              <FormControl
                v-model="form.adress.city"
                :icon="mdiMapMarker"
                type="text"
                placeholder="Ville"
                required
              />
              <FormControl
                v-model="form.adress.zipcode"
                :icon="mdiMapMarker"
                type="number"
                placeholder="Code postal"
                required
              />
            </FormField>
            <FormField label="Site web ">
              <FormControl
                v-model="form.website"
                :icon="mdiWeb"
                type="text"
                required
              />
            </FormField>
            <FormField label="Réseau social ">
              <FormControl
                v-model="form.socialNetwork"
                :icon="mdiLink"
                type="text"
                required
              />
            </FormField>
            <FormField label="Télephone">
              <FormControl
                v-model="form.phoneNumber"
                :icon="mdiPhone"
                type="number"
                required
              />
            </FormField>
            <BaseButton type="submit" color="info" label="Enregistrer" />
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
