<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiLock,
  mdiGoogle,
  mdiClose,
  mdiAlertCircle,
  mdiAt,
} from "@mdi/js";
import { useMainStore } from "@/stores/main.js";
import Footer from "@/components/Footer.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import StepperBar from "@/components/StepperBar.vue";
import imgIcon from "@/assets/ICON.ico";
import Loader from "@/components/Loader.vue";
import { accountService } from "@/_services";
import Cookies from "js-cookie";

const roleOptions = [
  {
    label: "un étudiant",
    value: "STUDENT",
  },
  {
    label: "une entreprise",
    value: "COMPANY",
  },
];

const contactForm = reactive({
  name: "",
  fname: "",
  email: "",
  role: "",
  message: "",
});

const isValid = ref(false);

const router = useRouter();

const isLoading = ref(false);

const contact = () => {
  accountService.contact(contactForm).then((isValid.value = true));
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="contact">
        <div class="flex justify-center">
          <div class="w-10/12">
            <CardBoxComponentTitle title="Nous contacter" underlined centered />
            <NotificationBarInCard
              v-show="isValid"
              color="success"
              :icon="mdiAlertCircle"
            >
              Message envoyé !
            </NotificationBarInCard>
            <FormField label="Vous êtes">
              <FormControl
                v-model="contactForm.role"
                name="role"
                type="select"
                :options="roleOptions"
                required
              />
            </FormField>

            <div class="flex justify-between">
              <FormField label="Nom" class="w-5/12">
                <FormControl
                  v-model="contactForm.name"
                  :icon="mdiAccount"
                  name="name"
                  type="text"
                  required
                />
              </FormField>
              <FormField label="Prénom" class="w-5/12">
                <FormControl
                  v-model="contactForm.fname"
                  :icon="mdiAccount"
                  name="fname"
                  type="text"
                  required
                />
              </FormField>
            </div>

            <FormField label="Adresse e-mail">
              <FormControl
                v-model="contactForm.email"
                :icon="mdiAt"
                name="email"
                type="email"
                required
              />
            </FormField>

            <FormField label="Message">
              <FormControl
                v-model="contactForm.message"
                name="message"
                type="textarea"
                :maxLength="255"
                required
              />
            </FormField>

            <div class="flex flex-col justify-center mt-4 mb-4">
              <BaseButton type="submit" color="info" label="Envoyer" />
            </div>
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
  <Footer />
</template>
