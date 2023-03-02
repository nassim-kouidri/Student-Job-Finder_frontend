<script setup>
import { reactive, ref } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from "@mdi/js";
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
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import Cookies from "js-cookie";
import ProgressBar from "../../components/ProgressBar.vue";
import LayoutCompany from "../../layouts/LayoutCompany.vue";

let offerCreation_values = JSON.parse(Cookies.get("offerCreation_cookies"));

const router = useRouter();

console.log("offerici--->" + offerCreation_values);

const form = reactive({
  context: "",
  mission: "",
  searchedProfile: "",
});

const submit = () => {
  Cookies.set(
    "offerCreation_cookies",
    JSON.stringify({
      title: offerCreation_values.title,
      sector: offerCreation_values.sector,
      contract: offerCreation_values.contract,
      remoteWork: offerCreation_values.remoteWork,
      nbrPlaces: offerCreation_values.nbrPlaces,
      salary: offerCreation_values.salary,
      level: offerCreation_values.level,
      address: {
        city: offerCreation_values.address.city,
        zipcode: offerCreation_values.address.zipcode,
      },
      startDate: offerCreation_values.startDate,
      endDate: offerCreation_values.endDate,
      context: form.context,
      mission: form.mission,
      searchedProfile: form.searchedProfile,
    })
  );
  router.push("/company/offer-step-3");
};
const revenir = () => {
  router.push("/company/offer-step-1");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBox is-form @submit.prevent="submit">
        <CardBoxComponentTitle
          title="Création d'une offre - Étape 2"
          centered
        />
        <ProgressBar :stepOne="true" :stepTwo="true" :step-three="false" />

        <FormField label="Contexte de l'offre" help=" Max 1200 characters">
          <FormControl
            type="textarea"
            v-model="form.context"
            maxLength="1200"
          />
        </FormField>

        <FormField label="La mission" help=" Max 1200 characters">
          <FormControl
            type="textarea"
            v-model="form.mission"
            maxLength="1200"
          />
        </FormField>
        <BaseDivider />
        <FormField label="Profil recherché" help=" Max 1200 characters">
          <FormControl
            type="textarea"
            v-model="form.searchedProfile"
            maxLength="1200"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Continuer" />
            <BaseButton
              v-on:click="revenir"
              color="ligthDark"
              label="Revenir"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
