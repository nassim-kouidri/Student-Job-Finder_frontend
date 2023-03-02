<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiLock,
  mdiGoogle,
  mdiClose,
  mdiAlertCircle,
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
import { companyService } from "@/_services";

const account = reactive({
  email: "",
  password: "",
});

const invalid = ref(false);

const router = useRouter();

const remember = ref(false);

const isLoading = ref(false);

const errorMessage = ref({});

const login = () => {
  isLoading.value = true;
  accountService
    .login(account)
    .then((res) => {
      accountService.saveToken("token", res.data.token, 80000);
      let user = JSON.stringify(res.data.user.role);
      accountService.saveUser(user);
      let role = JSON.stringify(res.data.user.role);
      let id = JSON.stringify(res.data.user.id);

      accountService.saveId(id);

      accountService.saveRole(role);

      if (res.data.role === "STUDENT") {
        let userName = res.data.user.name;
        let userFname = res.data.user.fname;
        accountService.saveNames(userName, userFname);
        if (res.data.user.image == null) {
          accountService.saveImage(
            "http://cdn.shopify.com/s/files/1/0004/4099/1797/collections/reglement.png?v=1552659160"
          );
        } else {
          let imageStudent = res.data.user.image.image;
          accountService.saveImage(imageStudent);
        }
        router.push("/");
      }
      if (res.data.role === "COMPANY") {
        accountService.getNameCompany(res.data.user.name);
        router.push("/company");
      }
      if (res.data.role === "ADMIN") {
        router.push("/admin");
      }
    })
    .catch((err) => {
      if (err == "AxiosError: Request failed with status code 403") {
        errorMessage.value = "Votre compte a été banni";
      } else {
        errorMessage.value = "Adresse e-mail ou mot de passe incorrect";
      }
      invalid.value = true;
      isLoading.value = false;
      console.log("error --->" + err);
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <div class="flex justify-center">
          <div class="w-10/12">
            <CardBoxComponentTitle title="Connexion" underlined centered />
            <NotificationBarInCard
              v-show="invalid"
              color="danger"
              :icon="mdiAlertCircle"
            >
              {{ errorMessage }}
            </NotificationBarInCard>
            <FormField label="Adresse e-mail">
              <FormControl
                v-model="account.email"
                :icon="mdiAccount"
                name="login"
                type="email"
                required
              />
            </FormField>
            <FormField label="Mot de passe">
              <FormControl
                v-model="account.password"
                :icon="mdiLock"
                name="password"
                type="password"
                required
              />
            </FormField>
            <RouterLink to="/">
              <div class="underline text-purple-700">Mot de passe oublié ?</div>
            </RouterLink>
            <!-- <FormCheckRadio
              name="remember"
              label="Sauvegarder mes identifiants"
              type="switch"
              inputValue="Boolean"
              class="mt-4"
            /> -->
            <div class="flex flex-col justify-center mt-4 mb-4">
              <BaseButton
                type="submit"
                color="info"
                :disabled="isLoading"
                label="Se connecter"
                :isLoading="isLoading"
              />
              <BaseDivider />
              <!-- <BaseButton
                color="lightDark"
                label="Se connecter avec Google"
                type="button"
                :icon="mdiGoogle"
                iconSize="25"
              /> -->
            </div>
            <div class="text-center">
              Vous n'avez pas de compte ?
              <RouterLink to="/register" class="underline text-purple-700">
                S'inscrire
              </RouterLink>
            </div>
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
  <Footer />
</template>
