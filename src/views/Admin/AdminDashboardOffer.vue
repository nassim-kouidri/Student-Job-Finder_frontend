<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAdmin from "@/layouts/LayoutAdmin.vue";
import Cookies from "js-cookie";
import OfferTable from "@/components/OfferTable.vue";
import CardBox from "@/components/CardBox.vue";
import Loader from "@/components/Loader.vue";
import { adminService } from "@/_services";
import _ from "lodash";

const offersList = ref([]);

const isLoading = ref(true);

onMounted(() => {
  adminService.getAllOffers().then((res) => {
    offersList.value = res.data;
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutAdmin>
    <SectionMain>
      <CardBox>
        <OfferTable v-if="!isLoading" :item="offersList" />
        <Loader class="text-center" v-else />
      </CardBox>
    </SectionMain>
  </LayoutAdmin>
</template>
