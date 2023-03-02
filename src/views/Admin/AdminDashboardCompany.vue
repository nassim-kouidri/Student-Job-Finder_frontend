<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAdmin from "@/layouts/LayoutAdmin.vue";
import Cookies from "js-cookie";
import CardBox from "@/components/CardBox.vue";
import CompanyTable from "@/components/CompanyTable.vue";
import Loader from "@/components/Loader.vue";
import { adminService } from "@/_services";
import _ from "lodash";

const companiesList = ref([]);

const isLoading = ref(true);

onMounted(() => {
  adminService.getAllCompanies().then((res) => {
    companiesList.value = res.data;
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutAdmin>
    <SectionMain>
      <CardBox>
        <CompanyTable v-if="!isLoading" :item="companiesList" />
        <Loader class="text-center" v-else />
      </CardBox>
    </SectionMain>
  </LayoutAdmin>
</template>
