<script setup>
import { ref, reactive, onMounted } from "vue";
import CardBoxSearch from "@/components/CardBoxSearch.vue";
import OfferList from "@/components/OfferList.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import { offerService } from "@/_services";
import Loader from "@/components/Loader.vue";
import BaseButtons from "@/components/BaseButtons.vue";

import {
  mdiMagnify,
  mdiMapMarker,
  mdiFileSign,
  mdiClose,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";

const contractList = ref([
  {
    label: "CDI",
    value: "CDI",
  },
  {
    label: "CDD",
    value: "CDD",
  },
  {
    label: "Stage",
    value: "STAGE",
  },
  {
    label: "Alternance",
    value: "ALTERNANCE",
  },
]);

const offersList = ref([]);

const filterForm = reactive({
  city: "",
  contractType: null,
  level: "",
  keyword: "",
});

const isLoading = ref(true);

const offersPerPage = 12;
const currentPage = ref(1);

const paginate = (offersList) => {
  const startIndex = (currentPage.value - 1) * offersPerPage;
  return offersList.slice(startIndex, startIndex + offersPerPage);
};
const currentPageOffers = ref({});

onMounted(() => {
  search();
});

const search = () => {
  isLoading.value = true;
  offerService.getFilteredOffers(filterForm).then((res) => {
    offersList.value = res.data;
    currentPageOffers.value = paginate(offersList.value);
    isLoading.value = false;
  });
};

const removeFilters = () => {
  filterForm.city = "";
  filterForm.contractType = null;
  filterForm.level = "";
  filterForm.keyword = "";
  search();
};

const handlePageNext = () => {
  currentPage.value = currentPage.value + 1;
  search();
};

const handlePagePrevious = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    search();
  }
};
</script>

<template>
  <div class="flex flex-wrap lg:justify-between md:justify-center">
    <div class="lg:w-[40ch] md:w-[70ch] sm:w-full">
      <div class="lg:w-[40ch] md:w-[70ch] lg:fixed md:static">
        <SectionTitleLineWithButton title="Dernières offres" main />
        <CardBox is-form @submit.prevent="search">
          <FormField>
            <FormControl
              v-model="filterForm.keyword"
              :icon="mdiMagnify"
              name="searchtext"
              type="text"
              placeholder="Recherchez par job, mot-clé..."
            />
          </FormField>
          <FormField>
            <FormControl
              v-model="filterForm.city"
              :icon="mdiMapMarker"
              name="location"
              type="text"
              placeholder="Où ?"
            />
          </FormField>
          <FormField>
            <FormControl
              v-model="filterForm.contractType"
              :icon="mdiFileSign"
              name="contract"
              type="select"
              :options="contractList"
            />
          </FormField>
          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Rechercher"
                iconSize="25"
              />
              <BaseButton
                type="button"
                iconColor="purple"
                outline
                color="info"
                label="Effacer les filtres"
                @click="removeFilters()"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </div>
    <div class="lg:w-[70ch] md:w-[70ch] sm:w-full">
      <Loader
        class="w-full flex justify-center mt-40 scale-125"
        v-if="isLoading"
      />
      <div v-else>
        <OfferList
          :item="currentPageOffers"
          :withCount="true"
          :totalCount="offersList.length"
        />
        <div class="py-4">
          <BaseButtons class="justify-between">
            <BaseButton
              color="info"
              :icon="mdiChevronLeft"
              iconColor="white"
              iconSize="25"
              @click="handlePagePrevious()"
              :disabled="currentPage < 2"
            />
            <BaseButton
              color="info"
              :icon="mdiChevronRight"
              iconColor="white"
              iconSize="25"
              @click="handlePageNext()"
            />
          </BaseButtons>
        </div>
      </div>
    </div>
  </div>
</template>
