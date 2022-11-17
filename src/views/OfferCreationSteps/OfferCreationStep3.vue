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
import { companyService } from "@/_services";
import Cookies from "js-cookie";
import LayoutCompany from "../../layouts/LayoutCompany.vue";

const router = useRouter();
let offerCreation_values = JSON.parse(Cookies.get("offerCreation_cookies"));

const form = reactive({
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
  context: offerCreation_values.context,
  mission: offerCreation_values.mission,
  requiredProfil: offerCreation_values.requiredProfil,
  question: "",
  answer: "",
});

var counter = 0;

const submit = () => {
  companyService
    .offerCreation(form)
    .then((res) => {
      router.push("/");
    })
    .catch((err) => console.log(err));
};
const revenir = () => {
  router.push("/OfferCreationStep2");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Création offre 3"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox is-form @submit.prevent="submit">
        <div>
          <FormField
            label="Question pour le candidat"
            help=" Max 255 characters"
          >
            <FormControl type="textarea" v-model="form.question" />
          </FormField>
          <FormField label="Réponse" help=" Max 255 characters">
            <FormControl type="textarea" v-model="form.answer" />
          </FormField>
          <BaseButton color="info" label="+Ajouter une question" />
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Créer l'offre" />
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
