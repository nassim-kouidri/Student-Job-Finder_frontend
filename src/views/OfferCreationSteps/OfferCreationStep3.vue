<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import { companyService } from "@/_services";
import Cookies from "js-cookie";
import ProgressBar from "../../components/ProgressBar.vue";
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
  address: {
    city: offerCreation_values.address.city,
    zipcode: offerCreation_values.address.zipcode,
  },
  level: offerCreation_values.level,

  startDate: offerCreation_values.startDate,
  endDate: offerCreation_values.endDate,
  context: offerCreation_values.context,
  mission: offerCreation_values.mission,
  searchedProfile: offerCreation_values.searchedProfile,
  questions: [""],
  // answer: "",
});
const counter = ref(1);

const addQuestion = () => {
  form.questions.push("");
  counter.value++;
};

const removeQuestion = () => {
  form.questions.pop();
  counter.value--;
};

const isLoading = ref(false);
const invalidUpdate = ref(false);
const validUpdate = ref(false);

const submit = () => {
  isLoading.value = true;
  companyService
    .offerCreation(form)
    .then((res) => {
      (isLoading.value = false), (validUpdate.value = true);
      // router.push("/company");
    })
    .catch((err) => {
      console.log(err), (invalidUpdate.value = true), (isLoading.value = false);
    });
};
const revenir = () => {
  router.push("/company/offer-step-2");
};
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBox is-form @submit.prevent="submit">
        <CardBoxComponentTitle
          title="Création d'une offre - Étape 3"
          centered
        />
        <ProgressBar :stepOne="true" :stepTwo="true" :step-three="true" />
        <NotificationBarInCard
          v-show="invalidUpdate"
          color="danger"
          :icon="mdiAlertCircle"
          >OUPS! L'offre n'a pas été crée
        </NotificationBarInCard>
        <NotificationBarInCard
          v-show="validUpdate"
          color="success"
          :icon="mdiAlertCircle"
          >L'offre a été bien créée
        </NotificationBarInCard>
        <div v-for="i in counter" :key="i">
          <FormField
            label="Question pour le candidat"
            help=" Max 255 characters"
          >
            <FormControl
              type="text"
              maxLength="255"
              v-model="form.questions[i - 1]"
            />
          </FormField>
        </div>
        <br />
        <BaseButton
          color="info"
          label="+ Ajouter une question"
          @click="addQuestion()"
        />&ensp;
        <BaseButton
          color="danger"
          label="- Supprimer une question"
          v-if="counter > 1"
          @click="removeQuestion"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Créer l'offre"
              :isLoading="isLoading"
              :disabled="isLoading"
            />
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
