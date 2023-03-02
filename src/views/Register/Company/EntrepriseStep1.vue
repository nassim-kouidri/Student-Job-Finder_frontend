<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiAlertCircle,
  mdiAsterisk,
  mdiCalendarRange,
  mdiPhone,
  mdiEmail,
  mdiLock,
} from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import imgIcon from "@/assets/ICON.ico";
import { accountService } from "@/_services";
import Cookies from "js-cookie";

const router = useRouter();

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
  return re.test(password);
}

const account = reactive({
  email: "",
  password: "",
  passwordverif: "",
});

const revenir = () => {
  router.push("/register");
};

const invalidPassword = ref(false);
const invalidPasswordRegex = ref(false);
const invalidEmail = ref(false);
const isLoading = ref(false);
const submit = () => {
  isLoading.value = true;
  if (account.password === account.passwordverif) {
    if (validateEmail(account.email)) {
      if (validatePassword(account.password)) {
        Cookies.set(
          "account_cookies",
          JSON.stringify({
            role: "company",
            email: account.email,
            password: account.password,
          })
        );
        isLoading.value = false;
        router.push("/register/company-step-2");
      } else {
        isLoading.value = false;
        invalidPasswordRegex.value = true;
      }
    } else {
      isLoading.value = false;
      invalidEmail.value = true;
    }
  } else {
    invalidPassword.value = true;
    isLoading.value = false;
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <CardBoxComponentTitle
              title="Étape 1"
              underlined
              centered
            ></CardBoxComponentTitle>
            <NotificationBarInCard
              v-show="invalidPassword"
              color="danger"
              :icon="mdiAlertCircle"
              >Les mots de passe ne concordent pas
            </NotificationBarInCard>
            <NotificationBarInCard
              v-show="invalidEmail"
              color="danger"
              :icon="mdiAlertCircle"
              >L'email saisi est invalide, veuillez corriger
            </NotificationBarInCard>
            <NotificationBarInCard
              v-show="invalidPasswordRegex"
              color="danger"
              :icon="mdiAlertCircle"
              >Le mot de passe doit contenir au minimum 8 caractères
            </NotificationBarInCard>

            <FormField label="Email" required>
              <FormControl
                type="email"
                :icon="mdiEmail"
                name="email"
                v-model="account.email"
                required
              />
            </FormField>
            <FormField
              label="Mot de passe"
              help="Nécessite 8 caractères minimum"
              required
            >
              <FormControl
                name="password"
                type="password"
                :icon="mdiLock"
                v-model="account.password"
                minLength="8"
                required
              />
            </FormField>
            <FormField label="Confirmation du mot de passe" required>
              <FormControl
                name="passwordverif"
                type="password"
                :icon="mdiLock"
                v-model="account.passwordverif"
                minLength="8"
                required
              />
            </FormField>
            <BaseButton
              type="submit"
              color="info"
              label="Suivant"
              :disabled="isLoading"
              :isLoading="isLoading"
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
