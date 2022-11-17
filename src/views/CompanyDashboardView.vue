<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiInformationOutline
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import companyBanner from "@/assets/company2_banner.png";
import companyLogo from "@/assets/company_logo.jpeg";
import BaseIcon from "@/components/BaseIcon.vue";

</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBox class="h-screen">
        <img class="w-full mb-32" :src="companyBanner" />
        <div class="absolute flex items-center" style="top: 400px">
          <img class="w-64 border-8 border-white drop-shadow-md mr-4" :src="companyLogo" />
          <div class="flex flex-col self-end">
            <div class="uppercase font-bold text-3xl">Pôle Emploi</div>
            <div>Établissement public à caractère administratif Français de recherche d'emploi</div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center">
          <div class="flex items-center text-lg w-full"><BaseIcon :path="mdiInformationOutline" size="25" class="mr-2" />Informations</div>
          <ul class="list-disc list-outside w-11/12">
            <li>Secteur: Recherche d'emploi</li>
            <li>Date de création: 1990</li>
          </ul>
        </div>
      </CardBox>
      
    </SectionMain>
  </LayoutCompany>
</template>