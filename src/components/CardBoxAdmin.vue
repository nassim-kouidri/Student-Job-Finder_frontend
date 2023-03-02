<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";
import {
  mdiAccountMultiple,
  mdiPresentation,
  mdiFilePresentationBox,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiBulletinBoard,
  mdiChartPie,
  mdiInformationOutline,
  mdiPencil,
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
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import companyBanner from "@/assets/company2_banner.png";
import companyLogo from "@/assets/company_logo.jpeg";
import BaseIcon from "@/components/BaseIcon.vue";
import CardBoxOffer from "@/components/CardBoxOffer.vue";
import CardBoxSearch from "@/components/CardBoxSearch.vue";
import Cookies from "js-cookie";
import moment from "moment";
import OfferList from "@/components/OfferList.vue";
import StudentTable from "@/components/StudentTable.vue";
import CardBoxComponentSection from "@/components/CardBoxComponentSection.vue";
import CompanyTable from "@/components/CompanyTable.vue";
import { adminService } from "@/_services";
import _ from "lodash";

const studentsList = ref([]);

const messageList = ref([]);

const archivedContact = (id) => {
  adminService.updateStatusArchivedContact(id);
};

onMounted(() => {
  adminService.getAllMessages().then((res) => {
    messageList.value = res.data;
    console.log(res.data);
  });
});
</script>
<template>
  <CardBox>
    <CardBoxComponentTitle title="Dashboard Admin" />
    <ul class="flex flex-col space-y-4 h-96 overflow-auto border rounded p-4">
      <div class="text-xl">Derniers messages</div>
      <li
        v-for="(message, index) in messageList"
        :key="index"
        class="bg-slate-100 p-4 rounded"
      >
        <div
          class="border rounded-full w-40 text-center text-white bg-slate-800"
          v-if="message.contactSiteStatus == 'ARCHIVED'"
        >
          Message archivé
        </div>
        <BaseButton
          v-else
          small
          label="Archiver"
          color="contrast"
          @click="archivedContact(message.id)"
        />
        <div>
          <strong>identité</strong> : {{ message.name }} {{ message.fname }}
        </div>
        <div><strong>role</strong> : {{ message.role }}</div>
        <div><strong>email</strong> : {{ message.email }}</div>
        <div><strong>message</strong> : {{ message.message }}</div>
      </li>
    </ul>
  </CardBox>
</template>
