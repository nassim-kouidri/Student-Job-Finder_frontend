<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import Cookies from "js-cookie";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import CompanyOfferTable from "@/components/CompanyOfferTable.vue";
import Loader from "@/components/Loader.vue";
import { companyService } from "@/_services";

const offers = ref([]);

const isLoading = ref(true);

onMounted(() => {
  let id = JSON.parse(Cookies.get("id"));
  companyService.getOffersCompany(id).then((res) => {
    offers.value = res.data;
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <div
        v-if="isLoading"
        class="w-full flex justify-center h-96 items-center"
      >
        <Loader />
      </div>

      <CardBox v-else>
        <CardBoxComponentTitle title="Vos offres" />
        <CompanyOfferTable :item="offers" v-if="offers.length > 0" />
        <div v-else>Aucune offre n'a été publiée</div>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
