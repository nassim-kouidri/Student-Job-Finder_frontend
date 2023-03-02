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
import SectionMain from "@/components/SectionMain.vue";
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
import LogoSJF from "@/assets/Logo-PSD.png";
import Cookies from "js-cookie";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
        <CardBoxComponentTitle title="Qui sommes nous ?" underlined />
        <div class="flex justify-center">
          <img class="w-6/12 py-8" :src="LogoSJF" />
        </div>

        <div class="p-4">
          Les fins de mois deviennent de plus en plus difficiles à gérer, plus
          d’un étudiant sur deux en France envisage de postuler à un job
          étudiant. <br /><br />
          Ainsi, afin de permettre à ces derniers d’obtenir une petite autonomie
          financière, nous simplifions leur parcours de recherche de petits jobs
          correspondant à leur domaine de compétences et si possible à leurs
          aspirations professionnelles futures. <br /><br />
          C’est dans ce sciage que nous proposons une solution web et mobile qui
          mettra en relation les étudiants qui veulent trouver un petit job pour
          compléter leur fin de mois et avoir une petite expérience avec des
          petites et moyennes entreprises.
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
  <Footer />
</template>
