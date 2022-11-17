<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { mdiAccount, mdiLock, mdiGoogle } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import StepperBar from "@/components/StepperBar.vue";
import imgIcon from "@/assets/ICON.ico";
import { accountService } from "@/_services";

const account = reactive({
  email: "",
  password: "",
  // remember: false,
});

const router = useRouter();

const login = () => {
  accountService
    .login(account)
    .then((res) => {
      accountService.saveToken("token", res.data.token, 80000);
      console.log(res.data.role);
      useMainStore().isLogged = true;

      if (res.data.role === "STUDENT") {
        router.push("/");
      }
      if (res.data.role === "COMPANY") {
        router.push("/company_dashboard");
      }
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <div class="flex justify-center">
          <div class="w-10/12">
            <CardBoxComponentTitle title="Connexion"></CardBoxComponentTitle>
            <FormField label="Adresse e-mail">
              <FormControl
                v-model="account.email"
                :icon="mdiAccount"
                name="login"
              />
            </FormField>

            <FormField label="Mot de passe">
              <FormControl
                v-model="account.password"
                :icon="mdiLock"
                type="password"
                name="password"
              />
            </FormField>

            <div class="underline mb-4">Mot de passe oublié ?</div>

            <FormCheckRadio
              name="remember"
              label="Sauvegarder mes identifiants"
              v-model="account.remember"
            />
            <div class="flex flex-col justify-center mt-4 mb-4">
              <BaseButton type="submit" color="info" label="Se connecter" />
              <BaseDivider />
              <BaseButton
                color="lightDark"
                label="Se connecter avec Google"
                type="button"
                :icon="mdiGoogle"
                iconSize="25"
              />
            </div>
            <div class="text-center">
              Vous n'avez pas de compte ?
              <RouterLink to="/register" class="underline"
                >S'inscrire</RouterLink
              >
            </div>
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
