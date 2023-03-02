<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAdmin from "@/layouts/LayoutAdmin.vue";
import Cookies from "js-cookie";
import CardBox from "@/components/CardBox.vue";
import StudentTable from "@/components/StudentTable.vue";
import Loader from "@/components/Loader.vue";

import { adminService } from "@/_services";
import _ from "lodash";

const studentsList = ref([]);

const isLoading = ref(true);

const reloadList = () => {
  isLoading.value = true;
  adminService.getAllStudents().then((res) => {
    studentsList.value = res.data;
    isLoading.value = false;
  });
};

onMounted(() => {
  adminService.getAllStudents().then((res) => {
    studentsList.value = res.data;
    isLoading.value = false;
  });
});
</script>

<template>
  <LayoutAdmin>
    <SectionMain>
      <CardBox>
        <StudentTable
          v-if="!isLoading"
          :item="studentsList"
          @reload="reloadList"
        />
        <Loader class="text-center" v-else />
      </CardBox>
    </SectionMain>
  </LayoutAdmin>
</template>
