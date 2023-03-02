<script setup>
import { ref, reactive } from "vue";
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

let student_values = JSON.parse(Cookies.get("account_cookies"));

const form = reactive({
  role: "student",
  fname: "",
  name: "",
  birthDay: null,
  phoneNumber: "",
  email: student_values.email,
  password: student_values.password,
});

const account = reactive({
  email: student_values.email,
  password: student_values.password,
});

const isLoading = ref(false);
const submit = () => {
  isLoading.value = true;
  accountService
    .registerStudent(form)
    .then((res) => {
      isLoading.value = false;
      router.push("/register/verify-step");
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};

const revenir = () => {
  router.push("/register/student-step-1");
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <CardBoxComponentTitle title="Étape 2" underlined centered>
            </CardBoxComponentTitle>
            <FormField label="Prénom" required>
              <FormControl
                type="text"
                :icon="mdiAccount"
                name="fname"
                v-model="form.fname"
                required
              />
            </FormField>
            <FormField label="Nom" required>
              <FormControl
                type="text"
                :icon="mdiAccount"
                name="name"
                v-model="form.name"
                required
              />
            </FormField>
            <FormField label="Date de naissance" required>
              <FormControl
                type="date"
                :icon="mdiCalendarRange"
                name="birthDay"
                v-model="form.birthDay"
                required
              />
            </FormField>
            <FormField label="Numéro de téléphone" required>
              <FormControl
                type="number"
                :icon="mdiPhone"
                name="num_tel"
                v-model="form.phoneNumber"
                required
              />
            </FormField>
            <BaseButton type="submit" color="info" label="Enregistrer" />
            <BaseDivider />
            <BaseButton
              v-on:click="revenir"
              color="infligthDarko"
              label="Revenir"
              :disabled="isLoading"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
