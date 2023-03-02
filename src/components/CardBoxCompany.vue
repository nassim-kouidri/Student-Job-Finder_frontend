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
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
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
import CardBoxComponentSection from "@/components/CardBoxComponentSection.vue";
import { companyService } from "@/_services";
import _ from "lodash";

const router = useRouter();

const offers = ref([]);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const getImage = (image) => {
  if (image == null) {
    return "https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc";
  } else {
    return image.image;
  }
};

const defaultImage = ref(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSugbq5FygQ1OIeq9w4GeV7UL7Ts-YO63-OIvxe58uvV06sWrBgLIY_KtUT9RCeWWkkKAw&usqp=CAU"
);

onMounted(() => {
  companyService.getOffersCompany(props.item.id).then((res) => {
    offers.value = res.data; /*
      (offers = offers.value.map((element) => {
        return {
          ...element,
          name: _.isNil(element.name)
            ? (element.name = "Non renseigné")
            : element.name,
          address: _.isNil(element.address)
            ? (element.address = { zipcode: "adresse non renseignée ...." })
            : element.address,
          logo: _.isNil(element.logo)
            ? (element.logo = {
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSugbq5FygQ1OIeq9w4GeV7UL7Ts-YO63-OIvxe58uvV06sWrBgLIY_KtUT9RCeWWkkKAw&usqp=CAU",
              })
            : element.logo,
          banner: _.isNil(element.banner)
            ? (element.banner = {
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1200px-Googleplex_HQ_%28cropped%29.jpg",
              })
            : element.banner,
        };
      }));
  });*/
  });
});

let dateTime = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
</script>
<template>
  <CardBox>
    <img class="h-72 w-full mb-32" :src="item.banner.image" />
    <div class="-mt-60 flex flex-wrap h-56">
      <div class="w-2/12 flex overflow-hidden">
        <div class="w-56">
          <img
            class="w-full border-8 border-white drop-shadow-md mr-4"
            :src="item.logo.image"
          />
        </div>
      </div>

      <div class="w-10/12 self-end pl-4">
        <div class="flex flex-col h-24">
          <div class="uppercase font-bold text-3xl flex justify-between">
            <div>{{ item.name }}</div>
            <BaseButton
              color="info"
              :icon="mdiPencil"
              iconColor="white"
              @click="router.push('/company/edit')"
            />
          </div>
          <div>{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-8 space-y-4">
      <CardBoxComponentSection
        title="Informations"
        :icon="mdiInformationOutline"
      >
        <ul>
          <li>Secteur : {{ item.sector }}</li>
          <li>Année de création : {{ dateTime(item.creationDate) }}</li>
          <li>
            Site web :
            <a
              class="underline text-purple-500"
              target="_blank"
              :href="item.website"
              >{{ item.website }}</a
            >
          </li>
          <li>Nombre de collaborateurs : {{ item.numberOfEmployees }}</li>
          <li>Âge moyen : {{ item.averageEmployeeAge }} ans</li>
        </ul>
      </CardBoxComponentSection>
      <CardBoxComponentSection title="Présentation" :icon="mdiPresentation">
        {{ item.presentation }}
      </CardBoxComponentSection>
      <CardBoxComponentSection title="Les offres" :icon="mdiBulletinBoard">
        <OfferList row :item="offers" />
      </CardBoxComponentSection>
    </div>
  </CardBox>
</template>
