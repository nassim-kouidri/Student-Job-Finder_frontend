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
import Cookies from "js-cookie";
import LayoutCompany from "../../layouts/LayoutCompany.vue";

let offerCreation_values = JSON.parse(Cookies.get("offerCreation_cookies"));

const router = useRouter();

const form = reactive({
  context: "",
  mission: "",
  requiredProfil: "",
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
      address: offerCreation_values.address,
      city: offerCreation_values.city,
      zipCode: offerCreation_values.zipCode,
      startDate: offerCreation_values.startDate,
      endDate: offerCreation_values.endDate,
      context: form.context,
      mission: form.mission,
      requiredProfil: form.requiredProfil,
    })
  );
  router.push("/OfferCreationStep3");
};
const revenir = () => {
  router.push("/OfferCreationStep1");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Création offre 2"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox is-form @submit.prevent="submit">
        <p>-------{{ offerCreation_values.title }}</p>
        <FormField label="Contexte de l'offre" help=" Max 255 characters">
          <FormControl type="textarea" v-model="form.context" />
        </FormField>
        <FormField label="La mission" help=" Max 255 characters">
          <FormControl type="textarea" v-model="form.mission" />
        </FormField>
        <FormField label="Profil recherché" help=" Max 255 characters">
          <FormControl type="textarea" v-model="form.requiredProfil" />
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
