<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import CardBoxOffer from "@/components/CardBoxOffer.vue";
import OfferDetailComponent from "@/components/OfferDetailComponent.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import Cookies from "js-cookie";
import { studentService } from "@/_services";

import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  totalCount: {
    type: Number,
    required: false,
  },
  withCount: Boolean,
  row: Boolean,
});

const offerClicked = ref({});

const modalActive = ref(false);

const buttonFav = ref[{}];

const componentClass = computed(() => {
  const base = "w-70ch";
  return base;
});

const gridClass = computed(() => {
  const base = [
    "flex ",
    props.row
      ? "space-x-4 items-stretch flex-nowrap overflow-x-auto p-4"
      : "flex-col space-y-4",
  ];
  return base;
});

const cardBoxClass = computed(() => {
  const base = [props.row ? "min-w-[80ch]" : ""];
  return base;
});

const favOffers = ref([]);

const iconFavList = ref([]);

const cardBoxOfferClicked = (offer) => {
  offerClicked.value = offer;
  modalActive.value = true;
};
</script>

<template>
  <div class="flex flex-col">
    <div
      v-show="totalCount > 0 && withCount"
      class="flex items-center mb-2 w-full"
    >
      <h1 class="text-lg">Offres correspondantes</h1>
      <div class="ml-2 rounded-full bg-purple-700 text-white pl-2 pr-2">
        {{ totalCount }}
      </div>
    </div>
    <CardBoxModal hasClose v-model="modalActive" :title="offerClicked.title">
      <OfferDetailComponent :withAction="true" :item="offerClicked" />
    </CardBoxModal>
    <div :class="gridClass">
      <div v-for="(offer, index) in item" :key="index" :class="cardBoxClass">
        <CardBoxOffer @offerClicked="cardBoxOfferClicked" :item="offer" />
      </div>
    </div>
  </div>
  <div v-if="item.length == 0" class="text-center">
    Aucune offre n'a été trouvée
  </div>
</template>
