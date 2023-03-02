<script setup>
import { ref, reactive, onMounted } from "vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxSearch from "@/components/CardBoxSearch.vue";
import OfferList from "@/components/OfferList.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { studentService } from "@/_services";
import Loader from "@/components/Loader.vue";
import CardBoxOffer from "@/components/CardBoxOffer.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import OfferDetailComponent from "@/components/OfferDetailComponent.vue";

import { mdiMagnify, mdiMapMarker, mdiFileSign } from "@mdi/js";

const offersList = ref([]);

const isLoading = ref(true);

const offerClicked = ref({});
const modalActive = ref(false);

const openOfferDetail = (offer) => {
  offerClicked.value = offer;
  modalActive.value = true;
};

onMounted(() => {
  studentService.getAdmissions().then((res) => {
    console.log(res.data);
    offersList.value = res.data;
    console.log(offersList.value);
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBoxModal hasClose v-model="modalActive" :title="offerClicked.title">
        <OfferDetailComponent :item="offerClicked" />
      </CardBoxModal>
      <div class="w-full">
        <SectionTitleLineWithButton title="Mes candidatures" main />
        <Loader
          class="w-full flex justify-center mt-40 scale-125"
          v-if="isLoading"
        />
        <div v-else class="flex flex-col space-y-4">
          <CardBoxOffer
            v-for="(offer, index) in offersList"
            @offerClicked="openOfferDetail"
            :key="index"
            :item="offer.offer"
            :status="offer.admissionStatus"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
