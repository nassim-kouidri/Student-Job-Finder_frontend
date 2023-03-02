<script setup>
import { defineProps, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { accountService, studentService } from "@/_services";
import Cookies from "js-cookie";

import {
  mdiBriefcase,
  mdiMapMarker,
  mdiBookmarkOutline,
  mdiBookmark,
} from "@mdi/js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

const company = ref({});

const favOffer = ref(mdiBookmarkOutline);

onMounted(() => {
  accountService.getCompany(props.item.companyId).then((res) => {
    company.value = res.data;
  });
  if (Cookies.get("userIsLogged")) {
    studentService.getFavOffer().then((res) => {
      res.data.forEach((fav) => {
        if (fav.id == props.item.id) favOffer.value = mdiBookmark;
      });
    });
  }
});

const getImage = (image) => {
  if (image == null) {
    return "https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc";
  } else {
    return image.image;
  }
};

const addFavOffer = (id) => {
  if (Cookies.get("userIsLogged")) {
    studentService.addFavOffer(id);
  }
};

const getStatus = () => {
  switch (props.status) {
    case "SENT":
      return "envoyée";
    case "PROGRESS":
      return "en cours de traitement";
    case "ACCEPTED":
      return "acceptée";
    case "REJECTED":
      return "refusée";
    default:
      return "aucun statut";
  }
};
</script>

<template>
  <div class="relative">
    <CardBox isHoverable @click="$emit('offerClicked', item)">
      <div class="flex flex-wrap space-x-6">
        <img class="w-2/12 rounded" :src="getImage(company.logo)" />
        <div class="w-8/12 flex flex-col">
          <div
            v-if="status"
            class="p-1 bg-purple-600 text-white text-sm rounded-md uppercase w-3/12 text-center mb-2"
          >
            {{ getStatus() }}
          </div>
          <div class="text-xl mb-2">{{ company.name }}</div>
          <CardBoxComponentTitle :title="item.title" />
          <div class="flex flex-wrap items-center space-x-2">
            <PillTag
              color="lightDark"
              :label="item.contract"
              :icon="mdiBriefcase"
            />
            <PillTag
              color="lightDark"
              :label="item.address.city"
              :icon="mdiMapMarker"
            />
          </div>
        </div>
      </div>
    </CardBox>
    <div class="w-2/12 absolute top-16 right-0">
      <BaseButton
        :icon="favOffer"
        iconColor="purple"
        iconSize="25"
        @click="addFavOffer(item.id)"
      />
    </div>
  </div>
</template>
