<script setup>
import { reactive, onMounted } from "vue";

import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";

import { mdiSchool, mdiCurrencyEur, mdiAccountGroup } from "@mdi/js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const selectOptionsLevel = [
  {
    label: "BAC",
    value: "BAC",
  },
  {
    label: "BAC + 1",
    value: "BAC1",
  },
  {
    label: "BAC + 2",
    value: "BAC2",
  },
  {
    label: "BAC + 3",
    value: "BAC3",
  },
  {
    label: "BAC + 4",
    value: "BAC4",
  },
  {
    label: "BAC + 5",
    value: "BAC5",
  },
];

const form = reactive({
  title: props.item.title,
  sector: props.item.sector,
  contract: props.item.contract,
  remoteWork: props.item.remoteWork,
  nbrPlaces: props.item.nbrPlaces,
  salary: props.item.salary,
  address: {
    city: props.item.address.city,
    zipcode: props.item.address.zipcode,
  },
  level: props.item.level,
  startDate: props.item.startDate,
  endDate: props.item.endDate,
  context: props.item.context,
  mission: props.item.mission,
  searchedProfile: props.item.searchedProfile,
  questions: props.item.questions,
});

const submit = () => {
  companyService.updateOffer(props.item.id, form).then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <form @submit.prevent="submit">
    <FormField label="Titre">
      <FormControl type="text" v-model="form.title" :maxLength="500" />
    </FormField>
    <FormField label="Contexte de l'offre">
      <FormControl type="textarea" v-model="form.context" :maxLength="500" />
    </FormField>
    <FormField label="La mission">
      <FormControl type="textarea" v-model="form.mission" :maxLength="500" />
    </FormField>
    <FormField label="Profil recherché">
      <FormControl
        type="textarea"
        v-model="form.searchedProfile"
        :maxLength="500"
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
    <div class="flex justify-between">
      <FormField label="Nombre de places" class="w-5/12">
        <FormControl
          type="number"
          :icon="mdiAccountGroup"
          v-model="form.nbrPlaces"
          :min="0"
        />
      </FormField>
      <FormField label="Salaire" class="w-5/12">
        <FormControl
          type="number"
          :icon="mdiCurrencyEur"
          v-model="form.salary"
          :min="0"
        />
      </FormField>
    </div>
    <div class="flex justify-between">
      <FormField label="Début" class="w-5/12">
        <FormControl type="date" v-model="form.startDate" />
      </FormField>
      <FormField label="Fin" class="w-5/12">
        <FormControl type="date" v-model="form.endDate" />
      </FormField>
    </div>

    <div class="flex justify-center">
      <BaseButton type="submit" color="info" label="Enregistrer" />
    </div>
  </form>
</template>
