<script setup>
import { computed } from "vue";
import { useStyleStore } from "@/stores/style";
import {
  gradientBgPurplePink,
  gradientBgDark,
  gradientBgPinkRed,
  gradientBgBase,
} from "@/colors";

const props = defineProps({
  bg: {
    type: String,
    required: true,
    validator: (value) => ["gray", "black"].includes(value),
  },
});

const colorClass = computed(() => {
  if (useStyleStore().darkMode) {
    return gradientBgDark;
  }

  switch (props.bg) {
    case "test":
      return gradientBgPurplePink;
    case "gray":
      return gradientBgBase;
    case "black":
      return gradientBgPinkRed;
  }

  return "";
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen items-center justify-center"
    :class="colorClass"
  >
  <slot card-class="w-[32rem] drop-shadow-md" />
   <!--<slot card-class="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl" />-->
  </div>
</template>
