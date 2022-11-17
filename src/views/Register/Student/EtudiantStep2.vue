<script setup>
import { ref, reactive } from "vue";
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
import { accountService } from "@/_services";
import Cookies from "js-cookie";

const router = useRouter();

let student_values = JSON.parse(Cookies.get("account_cookies"));

const form = reactive({
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
const submit = () => {
  accountService
    .registerStudent(form)
    .then((res) => {
      accountService
        .login(account)
        .then((res) => {
          accountService.saveToken("token", res.data.token, 800000);
          router.push("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionFullScreen v-slot="{ cardClass }" bg="gray">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        ----------{{ form.birthDay }}
        <div class="flex justify-center">
          <div class="flex flex-col justify-between w-10/12">
            <CardBoxComponentTitle title="Étape 2"></CardBoxComponentTitle>
            <FormField label="Prénom">
              <FormControl
                type="text"
                :icon="mdiAccount"
                name="fname"
                v-model="form.fname"
              />
            </FormField>
            <FormField label="Nom">
              <FormControl
                type="text"
                :icon="mdiAccount"
                name="name"
                v-model="form.name"
              />
            </FormField>
            <FormField label="Date de naissance">
              <FormControl
                type="date"
                :icon="mdiCalendarRange"
                name="birthDay"
                v-model="form.birthDay"
              />
            </FormField>
            <FormField label="Numéro de téléphone">
              <FormControl
                type="number"
                :icon="mdiPhone"
                name="num_tel"
                v-model="form.phoneNumber"
              />
            </FormField>
            <BaseButton
              type="submit"
              color="info"
              label="Enregistrer"
              :disabled="form.fname == ''"
            />
            <RouterLink to="/student-step-1"
              ><div class="mt-4 underline text-center">
                étape précédente
              </div></RouterLink
            >
          </div>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutAuthenticated>
</template>
