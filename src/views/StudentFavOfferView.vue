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

import { mdiMagnify, mdiMapMarker, mdiFileSign } from "@mdi/js";

const offersList = ref([]);

const isLoading = ref(true);

onMounted(() => {
  studentService.getFavOffer().then((res) => {
    offersList.value = res.data;
    console.log(offersList.value);
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="w-full">
        <SectionTitleLineWithButton title="Mes offres" main />

        <Loader
          class="w-full flex justify-center mt-40 scale-125"
          v-if="isLoading"
        />
        <OfferList v-else :item="offersList" :withCount="false" />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
