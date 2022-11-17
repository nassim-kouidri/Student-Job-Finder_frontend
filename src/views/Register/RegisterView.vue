<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
import logo from "@/assets/Logo-PSD.png";
import Cookies from "js-cookie";

const router = useRouter();

const submit = () => {
  var fifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  Cookies.set("account_cookies", role.value, { expires: fifteenMinutes });
  if (role.value == "student") {
    router.push("/register/student-step-1");
  } else {
    router.push("/register/company-step-1");
  }
};

const role = ref("");

const roleOptions = { student: "un étudiant", company: "une entreprise" };

let cookies = Cookies.get("account_cookies");

if (cookies != null) {
  role.value = cookies;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <!--<img :src="logo" class="w-40 mb-12"/>-->
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <div class="flex justify-center">
          <div class="flex flex-col w-10/12">
            <CardBoxComponentTitle title="Inscription"></CardBoxComponentTitle>
            <FormField label="Je suis:">
              <FormCheckRadioGroup
                type="radio"
                :options="roleOptions"
                :icon="mdiAccount"
                name="role"
                v-model="role"
                class="flex-col"
                required="true"
              />
            </FormField>
            <BaseButton
              type="submit"
              color="info"
              label="Suivant"
              :disabled="role.length == 0"
            />
            <div class="mt-4 text-center">
              Vous possédez déjà un compte ?
              <RouterLink to="/login" class="underline"
                >Se connecter</RouterLink
              >
            </div>
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
