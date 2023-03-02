<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { mdiAccount, mdiAsterisk, mdiCalendarRange, mdiPhone } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import { accountService } from "@/_services";
import Cookies from "js-cookie";

const router = useRouter();

let user_values = JSON.parse(Cookies.get("account_cookies"));
let roleAccount = user_values.role;

const form = reactive({
  email: user_values.email,
});

const form2 = reactive({
  code: "",
});

const account = reactive({
  email: user_values.email,
  password: user_values.password,
});

const isLoading = ref(false);
const isLoadingReset = ref(false);

const validReset = ref(false);

const submitReset = () => {
  isLoadingReset.value = true;
  accountService
    .verifyUserReset(roleAccount, form2.code, form)
    .then(() => (validReset.value = true), (isLoadingReset.value = false))
    .catch((err) => console.log(err), (isLoadingReset.value = false));
};
const submit = () => {
  isLoading.value = true;
  accountService
    .verifyUser(roleAccount, form2.code, form)
    .then((res) => {
      accountService
        .login(account)
        .then((res) => {
          accountService.saveToken("token", res.data.token, 80000);
          let user = JSON.stringify(res.data.user.role);
          accountService.saveUser(user);
          let role = JSON.stringify(res.data.user.role);
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
            isLoading.value = false;
            router.push("/");
          }
          if (res.data.role === "COMPANY") {
            isLoading.value = false;
            router.push("/company");
          }
        })
        .catch((err) => {
          isLoading.value = false;
          console.log("error --->" + err);
        });
    })
    .catch((err) => console.log(err));
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
            <CardBoxComponentTitle
              title="Vérification d'e-mail"
              underlined
              centered
            >
            </CardBoxComponentTitle>
            <NotificationBarInCard
              v-show="validReset"
              color="danger"
              :icon="mdiAlertCircle"
              >Un nouveau code a été envoyé
            </NotificationBarInCard>
            <div class="space-y-3">
              <p>
                Entrez le code de 6 caractères envoyé à : {{ account.email }}
              </p>
              <br />
            </div>

            <FormField
              label="Code de vérification"
              help="Assurez-vous de vérifier votre dossier de spam"
              required
            >
              <FormControl
                type="text"
                :icon="mdiAccount"
                name="code"
                v-model="form2.code"
                required
              />
            </FormField>

            <BaseButton
              type="submit"
              color="info"
              label="Se connecter"
              :disabled="isLoading"
              :isLoading="isLoading"
            /><br />
            <BaseButton
              v-on:click="submitReset"
              color="infligthDarko"
              label="Renvoyer"
              :disabled="isLoadingReset"
              :isLoading="isLoadingReset"
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
