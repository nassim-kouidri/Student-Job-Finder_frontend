<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAdmin from "@/layouts/LayoutAdmin.vue";
import Cookies from "js-cookie";
import CardBoxAdmin from "@/components/CardBoxAdmin.vue";
import { companyService } from "@/_services";
import _ from "lodash";
</script>

<template>
  <LayoutAdmin>
    <SectionMain>
      <CardBoxAdmin />
    </SectionMain>
  </LayoutAdmin>
</template>
