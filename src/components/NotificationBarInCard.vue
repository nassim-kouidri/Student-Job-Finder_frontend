<script setup>
import { colorsBgLight } from "@/colors.js";
import BaseIcon from "@/components/BaseIcon.vue";

defineProps({
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="flex flex-col  animate-fade-in mt-4 mb-4">
    <div
      :class="[colorsBgLight[color]]"
      class="rounded flex items-center p-4 transition-colors">
        <BaseIcon
          v-if="icon"
          :path="icon"
          w="w-10 md:w-5"
          h="h-10 md:h-5"
          size="24"
          class="md:mr-2"
        />
      <slot />
    </div>
  </div>
</template>
