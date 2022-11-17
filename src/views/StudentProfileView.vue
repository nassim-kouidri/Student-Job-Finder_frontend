<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiTextAccount,
  mdiAccountSchool,
  mdiMapMarkerRadius,
  mdiFileSign,
  mdiAccountHardHat,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import { studentService } from "@/_services";

const selectSecteurs = ["Informatique", "Gastronomie", "Bureautique"];

const selectContrats = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];

const form1 = reactive({
  firstname: "",
  name: "",
  email: "",
  biographie: "",
});
const form2 = reactive({
  sector: selectSecteurs[0],
  contract: selectContrats[0],
  diploma: "",
  city: "",
});

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    console.log(reader.result);
  });
  reader.readAsDataURL(file);
});

const submit1 = () => {
  studentService
    .editInformationStudent(form1)
    .then((res) => {})
    .catch((err) => console.log(err));
};
const submit2 = () => {
  studentService
    .editInformationStudent(form2)
    .then((res) => {})
    .catch((err) => console.log(err));
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submit1">
          <FormField label="Photo de profil" help="Max 500ko">
            <FormFilePicker label="Upload" />
          </FormField>
          <div class="flex justify-between">
            <FormField label="Prénom">
              <FormControl
                v-model="form1.firstname"
                :icon="mdiAccount"
                name="prenom"
                disabled
              />
            </FormField>
            <FormField label="Nom">
              <FormControl
                v-model="form1.name"
                :icon="mdiAccount"
                name="nom"
                disabled
              />
            </FormField>
          </div>

          <FormField label="E-mail">
            <FormControl
              v-model="form1.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>
          <FormField label="Biographie">
            <FormControl
              v-model="form1.biographie"
              :icon="mdiTextAccount"
              type="textarea"
              name="biographie"
              placeholder="Parlez de vous..."
              required
              autocomplete="biographie"
            />
          </FormField>

          <template #footer>
            <BaseButton color="info" type="submit" label="Enregistrer" />
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submit2">
          <FormField label="Dernier diplôme obtenu">
            <FormControl
              :icon="mdiAccountSchool"
              name="current_diplome"
              type="text"
              required
              autocomplete="current_diplome"
              v-model="form2.diploma"
            />
          </FormField>

          <BaseDivider />
          <div class="flex justify-between flex-wrap">
            <div class="w-full mb-3 text-lg">Préférences de recherche</div>
            <FormField label="Secteur" class="w-5/12">
              <FormControl
                :icon="mdiAccountHardHat"
                :options="selectSecteurs"
                v-model="form2.sector"
              />
            </FormField>
            <FormField label="Contrat" class="w-5/12">
              <FormControl
                :icon="mdiFileSign"
                :options="selectContrats"
                v-model="form2.contract"
              />
            </FormField>
          </div>

          <FormField label="Localisation">
            <FormControl
              :icon="mdiMapMarkerRadius"
              name="current_diplome"
              type="text"
              placeholder="Ville"
              required
              autocomplete="current_diplome"
              v-model="form2.city"
            />
          </FormField>

          <input type="file" id="fileInput" />

          <template #footer>
            <BaseButton type="submit" color="info" label="Enregistrer" />
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
