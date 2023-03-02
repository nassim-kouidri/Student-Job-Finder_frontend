<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiInformationOutline,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
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
import Cookies from "js-cookie";
import moment from "moment";
import CardBoxComponentSection from "@/components/CardBoxComponentSection.vue";
import OfferList from "@/components/OfferList.vue";
import { accountService } from "@/_services";

const route = useRoute();
const router = useRouter();

const companyInfo = ref({});

const id = route.params.id;

const getImage = (image) => {
  if (image == null) {
    return "https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc";
  } else {
    return image.image;
  }
};

onMounted(() => {
  accountService
    .getCompany(id)
    .then((res) => {
      companyInfo.value = res.data;
    })
    .catch((err) => console.log(err));
});

let dateTime = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const createChatRoom = () => {
  accountService
    .createChatRoom(id)
    .then((res) => {
      console.log("Creation de la chatRoom " + res.data),
        Cookies.set(
          "chatRoom",
          JSON.stringify({
            chatRoomId: res.data.chatRoomId,
            companyId: res.data.company,
            studentId: res.data.student,
          })
        ),
        router.push("/student/chat");
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Présentation de l'entreprise"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <img class="h-72 w-full mb-32" :src="getImage(companyInfo.banner)" />
        <div class="-mt-60 flex bg-white">
          <img
            class="w-64 h-56 border-8 border-white drop-shadow-md mr-4"
            :src="getImage(companyInfo.logo)"
          />
          <div class="w-full self-end">
            <div class="flex flex-col h-24">
              <div class="uppercase font-bold text-3xl flex justify-between">
                <div>{{ companyInfo.name }}</div>
              </div>
              <div>{{ companyInfo.description }}</div>
            </div>
          </div>
        </div>
        <div class="flex mt-8 flex-col space-y-4">
          <CardBoxComponentSection
            title="Informations"
            :icon="mdiInformationOutline"
          >
            <ul>
              <li>Secteur : {{ companyInfo.sector }}</li>
              <li>
                Année de création : {{ dateTime(companyInfo.creationDate) }}
              </li>
              <li>Site web : {{ companyInfo.website }}</li>
              <li>
                Nombre de collaborateurs : {{ companyInfo.numberOfEmployees }}
              </li>
              <li>Âge moyen : {{ companyInfo.averageEmployeeAge }} ans</li>
            </ul>
          </CardBoxComponentSection>
          <CardBoxComponentSection title="Présentation" :icon="mdiPresentation">
            {{ companyInfo.presentation }}
          </CardBoxComponentSection>
          <CardBoxComponentSection title="Les offres" :icon="mdiBulletinBoard">
            <OfferList
              small
              v-if="companyInfo.offers"
              :item="companyInfo.offers"
            />
          </CardBoxComponentSection>
        </div>
        <br />
        <BaseButton
          color="info"
          label="Contacter l'entreprise"
          @click="createChatRoom()"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
