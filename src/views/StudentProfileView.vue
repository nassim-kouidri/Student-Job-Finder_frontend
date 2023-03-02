<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiWeb,
  mdiLinkedin,
  mdiTextAccount,
  mdiAccountSchool,
  mdiCalendarRange,
  mdiPhone,
  mdiLock,
  mdiMapMarkerRadius,
  mdiFileSign,
  mdiAccountHardHat,
  mdiAt,
  mdiAlertCircle,
  mdiContentSave,
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
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import FormFieldGroup from "@/components/FormFieldGroup.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import { studentService } from "@/_services";
import Cookies from "js-cookie";
import moment from "moment";
import { findProp } from "@vue/compiler-core";
import UserAvatar from "@/components/UserAvatar.vue";

const selectContrats = ["CDI", "CDD", "STAGE", "ALTERNANCE", "FREELANCE"];

const selectLevel = ["BAC+1", "BAC+2", "BAC+3", "BAC+4", "BAC+5"];

const selectOptionsSector = [
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
  "Énergie",
  "Immobilier",
  "Journalisme",
  "Industriel",
  "Informatique - Electronique - Numérique",
  "Ressources Humaines",
  "Sport",
  "Santé - Paramédical",
  "Transport  Logistique",
  "Enseignement - Formation",
];

const handleImage = (e) => {
  const selectedImage = e.target.files[0];
  createBase64Image(selectedImage);
};

const createBase64Image = (fileObject) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    form.image.image = e.target.result;
    console.log(form.image.image);
  };

  reader.readAsDataURL(fileObject);
};

let user = ref();

onMounted(() => {
  studentService
    .getStudent()
    .then((res) => ((user.value = res.data), remplissageform(user.value)))
    .catch((res) => console.log("probleme-->", res));
});

const formPassword = reactive({
  oldPassword: "",
  newPassword: "",
  newPasswordVerif: "",
});

const form = reactive({
  fname: "",
  name: "",
  email: "",
  birthDate: null,
  biography: "",
  phoneNumber: "",
  area: "",
  level: "",
  contratType: null,
  image: {
    image: "", //     "https://st.depositphotos.com/1023102/2325/i/600/depositphotos_23257948-stock-photo-the-mosque-of-hassan-ii.jpg",
  },

  sector: "",
  diplomaSector: "",
  linkedin: "",
  github: "",
  website: "",
});

const remplissageform = (user) => {
  form.fname = user.fname;
  form.name = user.name;
  form.email = user.email;
  form.birthDate = user.birthDate;
  form.biography = user.biography;
  form.phoneNumber = user.phoneNumber;
  form.area = user.area;
  form.contratType = user.contratType;
  form.image.image = localStorage.getItem("image");
  // form.image.image = user.image.image;
  form.sector = user.sector;
  form.diplomaSector = user.diplomaSector;
  form.linkedin = user.linkedin;
  form.github = user.github;
  form.website = user.website;
};

const isLoading = ref(false);
const invalidUpdate = ref(false);
const validUpdate = ref(false);

const submit = () => {
  isLoading.value = true;
  studentService
    .updateStudent(form)
    .then(() => {
      (isLoading.value = false),
        (validUpdate.value = true),
        localStorage.setItem("image", form.image.image);
    })
    .catch((err) => {
      console.log(err), (isLoading.value = false), (invalidUpdate.value = true);
    });
};

const isLoadingInternet = ref(false);
const invalidInternet = ref(false);
const validInternet = ref(false);

const submitInternet = () => {
  isLoadingInternet.value = true;
  studentService
    .updateStudent(form)
    .then(
      (res) => (validInternet.value = true),
      (isLoadingInternet.value = false)
    )
    .catch(
      (err) => (invalidInternet.value = true),
      (isLoadingInternet.value = false)
    );
};
const deleteStudent = () => {
  studentService.deleteStudent();
};

const isLoadingPassword = ref(false);
const invalidPassword = ref(false);
const validPassword = ref(false);
const passwordIncorect = ref(false);

const submitPassword = () => {
  isLoadingPassword.value = true;
  if (formPassword.newPassword === formPassword.newPasswordVerif) {
    studentService
      .editPasswordStudent(formPassword)
      .then((res) => {
        if (res.data == "incorrect password") {
          passwordIncorect.value = true;
          isLoadingPassword.value = false;
        } else {
          (validPassword.value = true), (isLoadingPassword.value = false);
        }
      })
      .catch((err) => console.log(err));
  } else {
    invalidPassword.value = true;
    isLoadingPassword.value = false;
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between">
        <CardBox
          is-form
          @submit.prevent="submit"
          class="w-7/12"
          enctype="multipart/form-data"
        >
          <CardBoxComponentTitle title="Mes informations" />
          <NotificationBarInCard
            v-show="invalidUpdate"
            color="danger"
            :icon="mdiAlertCircle"
            >Vos données n'ont pas été mise à jour
          </NotificationBarInCard>
          <NotificationBarInCard
            v-show="validUpdate"
            color="success"
            :icon="mdiAlertCircle"
          >
            Modification de vos informations enregistrée
          </NotificationBarInCard>
          <div class="flex flex-col items-center">
            <UserAvatarCurrentUser
              class="w-44 h-44 mb-4"
              :avatar="form.image.image"
            />
            <FormField help="Max 500ko">
              <FormFilePicker
                label="Upload"
                @change="handleImage"
                accept="image/*"
              />
            </FormField>
          </div>
          <div class="flex justify-between">
            <FormField label="Prénom" class="w-5/12">
              <FormControl
                v-model="form.fname"
                type="text"
                :icon="mdiAccount"
                name="prenom"
                disabled
              />
            </FormField>
            <FormField label="Nom" class="w-5/12">
              <FormControl
                v-model="form.name"
                type="text"
                :icon="mdiAccount"
                name="nom"
                disabled
              />
            </FormField>
          </div>
          <FormField label="E-mail">
            <FormControl
              v-model="form.email"
              :icon="mdiAt"
              type="email"
              name="email"
              disabled
            />
          </FormField>
          <div class="flex justify-between">
            <FormField label="Date de naissance" class="w-5/12">
              <FormControl
                v-model="form.birthDate"
                :icon="mdiCalendarRange"
                type="date"
                name="birthDate"
              />
            </FormField>
            <FormField label="Numéro de télephone" class="w-5/12">
              <FormControl
                v-model="form.phoneNumber"
                type="text"
                :icon="mdiPhone"
                name="phoneNumber"
              />
            </FormField>
          </div>
          <FormField label="Biographie" help="Facultatif mais recommandé">
            <FormControl
              v-model="form.biography"
              type="textarea"
              maxLength="500"
              name="biographie"
              placeholder="Exprimez-vous, démarquez-vous des autres candidats !"
              autocomplete="biographie"
            />
          </FormField>
          <BaseDivider />
          <CardBoxComponentTitle title="Ma formation" />
          <div class="flex justify-between">
            <FormField label="Domaine d'étude" class="w-5/12">
              <FormControl
                :icon="mdiAccountSchool"
                :options="selectOptionsSector"
                v-model="form.diplomaSector"
              />
            </FormField>
            <FormField label="Niveau d'étude" class="w-5/12">
              <FormControl
                :icon="mdiAccountSchool"
                :options="selectLevel"
                v-model="form.level"
              />
            </FormField>
          </div>
          <BaseDivider />
          <CardBoxComponentTitle title="Préférences de recherche" />
          <div class="flex justify-between flex-wrap">
            <FormField label="Secteur" class="w-5/12">
              <FormControl
                :icon="mdiAccountHardHat"
                :options="selectOptionsSector"
                v-model="form.sector"
              />
            </FormField>
            <FormField label="Contrat" class="w-5/12">
              <FormControl
                :icon="mdiFileSign"
                :options="selectContrats"
                v-model="form.contratType"
              />
            </FormField>
          </div>
          <FormField label="Localisation">
            <FormControl
              :icon="mdiMapMarkerRadius"
              name="localisation"
              type="text"
              placeholder="Ville"
              autocomplete="localisation"
              v-model="form.area"
            />
          </FormField>
          <template #footer>
            <BaseButton
              type="submit"
              color="info"
              label="Enregistrer"
              :isLoading="isLoading"
              :disabled="isLoading"
            />
          </template>
        </CardBox>

        <CardBox class="w-4/12">
          <CardBoxComponentTitle title="Sécurité de votre compte" />
          <NotificationBarInCard
            v-show="invalidPassword"
            color="danger"
            :icon="mdiAlertCircle"
            >Les mots de passe ne concordent pas
          </NotificationBarInCard>
          <NotificationBarInCard
            v-show="validPassword"
            color="success"
            :icon="mdiAlertCircle"
            >Le mot de passe a été réinitialiser
          </NotificationBarInCard>
          <NotificationBarInCard
            v-show="passwordIncorect"
            color="danger"
            :icon="mdiAlertCircle"
            >Le mot de passe est incorrecte
          </NotificationBarInCard>
          <form @submit.prevent="submitPassword">
            <div class="flex flex-col">
              <FormField label="Mot de passe actuel" required>
                <FormControl
                  :icon="mdiLock"
                  name="password"
                  placeholder="****************"
                  type="password"
                  v-model="formPassword.oldPassword"
                  required
                />
              </FormField>
              <FormField
                label="Nouveau mot de passe"
                help="Nécessite 8 caractères minimum"
              >
                <FormControl
                  :icon="mdiLock"
                  name="newpassword"
                  placeholder="****************"
                  type="password"
                  v-model="formPassword.newPassword"
                  minLength="8"
                  required
                />
              </FormField>
              <FormField label="Confirmer le nouveau mot de passe">
                <FormControl
                  :icon="mdiLock"
                  name="password"
                  type="password"
                  v-model="formPassword.newPasswordVerif"
                  minLength="8"
                  required
                />
              </FormField>
              <BaseButton type="submit" color="info" label="Enregistrer" />
            </div>
          </form>
          <BaseDivider />
          <CardBoxComponentTitle title="Ma présence sur internet" />
          <NotificationBarInCard
            v-show="invalidInternet"
            color="danger"
            :icon="mdiAlertCircle"
            >Oups! Une erreure a été commise
          </NotificationBarInCard>
          <NotificationBarInCard
            v-show="validInternet"
            color="success"
            :icon="mdiAlertCircle"
            >Votre présence sur internet a été modifié
          </NotificationBarInCard>
          <form @submit.prevent="submitInternet">
            <div class="flex flex-col">
              <FormField label="Site Web perso">
                <FormControl
                  :icon="mdiWeb"
                  name="website"
                  type="url"
                  placeholder="https://www.monsite.com"
                  v-model="form.website"
                />
              </FormField>
              <FormField label="GitHub">
                <FormControl
                  :icon="mdiGithub"
                  name="github"
                  type="url"
                  placeholder="https://www.github.com/profile"
                  v-model="form.github"
                /> </FormField
              ><FormField label="LinkedIn">
                <FormControl
                  :icon="mdiLinkedin"
                  name="linkdin"
                  type="url"
                  placeholder="https://www.linkedin.com"
                  v-model="form.linkedin"
                />
              </FormField>
              <BaseButton type="submit" color="info" label="Enregistrer" />
            </div>
          </form>
          <BaseDivider />
          <CardBoxComponentTitle
            title="Vous souhaitez supprimer votre compte ?"
          />
          Si vous avez la moindre question concernant le traitement de vos
          données personnelles, veuillez contacter notre équipe.
          <br /><br />
          <form @submit.prevent="deleteStudent">
            <BaseButton
              type="submit"
              color="danger"
              label="Supprimer mon compte"
            />
          </form>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
