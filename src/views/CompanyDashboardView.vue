<script setup>
import { ref, onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import Cookies from "js-cookie";
import CardBoxCompanyVue from "../components/CardBoxCompany.vue";
import { companyService } from "@/_services";
import _ from "lodash";

// let user = JSON.parse(Cookies.get("user"));

let company = ref();
const imagedefault = () => {};
onMounted(() => {
  companyService
    .getCompany()
    .then(
      (res) => (
        (company.value = res.data),
        (company.value.logo = _.isNil(company.value.logo)
          ? (company.value.logo = {
              image:
                "https://thumbs.dreamstime.com/b/blank-purple-violet-paper-texture-background-art-design-ba-blank-purple-violet-paper-texture-background-art-design-117683675.jpg",
            })
          : company.value.logo),
        (company.value.banner = _.isNil(company.value.banner)
          ? (company.value.banner = {
              image: "https://i.ytimg.com/vi/mEfcJF34Vmo/maxresdefault.jpg",
            })
          : company.value.banner),
        console.log("company-->", company)
      )
    )
    .catch((err) => console.log("probleme-->", err));
});
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBoxCompanyVue :item="company" v-if="company" />
    </SectionMain>
  </LayoutCompany>
</template>
