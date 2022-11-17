<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiAsterisk,
  mdiCalendarRange,
  mdiPhone,
  mdiEmail,
  mdiLock,
} from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
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

const account = reactive({
  email: "",
  password: "",
  passwordverif: "",
});

const submit = () => {
  if (account.password === account.passwordverif) {
    Cookies.set(
      "account_cookies",
      JSON.stringify({
        role: Cookies.get("account_cookies"),
        email: account.email,
        password: account.password,
      })
    );
    router.push("/register/company-step-2");
  }
};

const revenir = () => {
  router.push("/register");
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <CardBoxComponentTitle title="Étape 1"></CardBoxComponentTitle>
            <FormField label="Email">
              <FormControl
                type="text"
                :icon="mdiEmail"
                name="email"
                v-model="account.email"
                required="true"
              />
            </FormField>
            <FormField label="Mot de passe">
              <FormControl
                name="password"
                type="password"
                :icon="mdiLock"
                v-model="account.password"
                required="true"
              />
            </FormField>
            <FormField label="Confirmation du mot de passe">
              <FormControl
                name="passwordverif"
                type="password"
                :icon="mdiLock"
                v-model="account.passwordverif"
                required="false"
              />
            </FormField>
            <BaseButton
              type="submit"
              color="info"
              label="Suivant"
              :disabled="account.email == ''"
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
