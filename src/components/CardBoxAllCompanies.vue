<script setup>
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiInformation, mdiMapMarker } from "@mdi/js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
console.log(props.item);
</script>

<template>
  <router-link :to="'/companie/' + item.id">
    <CardBox isHoverable>
      <img
        v-if="item.banner != null"
        class="h-32 w-full"
        :src="item.banner.image"
      />
      <img
        v-else
        class="h-32 w-full"
        src="https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc"
      />
      <div
        class="-mt-14 ml-2 w-28 drop-shadow-md h-24 box-border flex justify-center bg-white"
      >
        <img v-if="item.logo != null" class="" :src="item.logo.image" />
        <img
          v-else
          src="https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc"
        />
      </div>

      <CardBoxComponentTitle :title="item.name" />
      <p><BaseIcon :path="mdiInformation" />{{ item.sector }}</p>
      <p>
        <BaseIcon :path="mdiMapMarker" />{{ item.address.city }},
        {{ item.address.zipcode }}
      </p>
    </CardBox></router-link
  >
</template>
