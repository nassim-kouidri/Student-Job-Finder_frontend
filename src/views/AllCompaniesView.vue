<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiMapMarkerRadius,
  mdiFormatListBulletedType,
  mdiMagnify,
  mdiClose,
} from "@mdi/js";

import * as chartConfig from "@/components/Charts/chart.config.js";
import CardBoxAllCompaniesVue from "../components/CardBoxAllCompanies.vue";
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
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { accountService, companyService } from "@/_services";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import _ from "lodash";

const selectOptionsSector = [
  "Administratif",
  "Aéronautique et Transport aérien",
  "Architecte - BTP - Urbanisme",
  "Art - Culture",
  "Assurance",
  "Audiovisuel - Cinéma",
  "Automobile",
  "Banque - Finance",
  "Chimie - Biologie",
  "Commerce - Vente - Distribution",
  "Marketing - Communication",
  "Comptabilité - Economie - Gestion",
  "Droit - Justice",
  "Hôtellerie - Restauration - Tourisme",
  "Energie",
  "Immobilier",
  "Journalisme",
  "Industriel",
  "Informatique - Electronique - Numérique",
  "Ressourses Humaines",
  "Sport",
  "Santé - Paramédical",
  "Transport  Logistique",
  "Enseignement - Formation",
];

const companiesList = ref([]);

const isLoading = ref(true);

const filterForm = reactive({
  city: "",
  sector: "",
  keyword: "",
});

const search = () => {
  isLoading.value = true;
  console.log(filterForm);
  companyService.getFilteredCompanies(filterForm).then((res) => {
    companiesList.value = res.data;
    console.log(res.data);
    isLoading.value = false;
  });
};

onMounted(() => {
  accountService
    .getAllCompanies()
    .then(
      (res) => (
        (companiesList.value = res.data),
        (isLoading.value = false),
        (companiesList.value = companiesList.value.map((element) => {
          return {
            ...element,
            name: _.isNil(element.name)
              ? (element.name = "Nom renseigné")
              : element.name,
            address: _.isNil(element.address)
              ? (element.address = { zipcode: "adress renseigné ...." })
              : element.address,
            logo: _.isNil(element.logo)
              ? (element.logo = {
                  image:
                    "https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc",
                })
              : element.logo,
            banner: _.isNil(element.banner)
              ? (element.banner = {
                  image:
                    "https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc",
                })
              : element.banner,
          };
        })),
        console.log("list", companiesList)
      )
    )
    .catch((err) => console.log(err));
});

const removeFilters = () => {
  filterForm.city = "";
  filterForm.sector = "";
  filterForm.keyword = "";
  search();
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Trouver une entreprise"
        main
      />
      <div class="flex flex-col">
        <CardBox is-form @submit.prevent="search" enctype="multipart/form-data">
          <div class="flex gap-6 justify-between">
            <FormField class="w-5/6">
              <FormControl
                v-model="filterForm.keyword"
                :icon="mdiMagnify"
                name="searchtext"
                type="text"
                placeholder="Recherchez par entreprise, mot-clés..."
              />
            </FormField>
            <FormField class="w-5/12">
              <FormControl
                v-model="filterForm.city"
                :icon="mdiMapMarkerRadius"
                name="searchlocation"
                type="text"
                placeholder="Lieu"
              />
            </FormField>
            <FormField class="w-5/12">
              <FormControl
                v-model="filterForm.sector"
                :icon="mdiFormatListBulletedType"
                name="secteur"
                :options="selectOptionsSector"
                placeholder="Secteur"
              />
            </FormField>
          </div>
          <div class="flex justify-end">
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Rechercher"
                class="w-26 h-12"
              />
              <BaseButton
                type="button"
                outline
                color="info"
                label="Effacer les filtres"
                @click="removeFilters()"
                class="w-26 h-12"
              />
            </BaseButtons>
          </div>
        </CardBox>
        <div class="w-full">
          <Loader
            class="flex justify-center mt-32 scale-125"
            v-if="isLoading"
          />
          <div v-else>
            <div
              v-if="companiesList.length > 0"
              class="grid grid-cols-3 gap-4 mt-8"
            >
              <div v-for="(company, index) in companiesList" :key="index">
                <CardBoxAllCompaniesVue :item="company" />
              </div>
            </div>
            <div v-else>Aucune entreprise n'a été trouvée</div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
  <Footer />
</template>
