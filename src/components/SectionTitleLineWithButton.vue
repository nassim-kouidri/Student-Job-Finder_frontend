<script setup>
import { mdiCog } from "@mdi/js";
import { useSlots, computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconRounded from "@/components/IconRounded.vue";

defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
});

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <section
    :class="{ 'pt-6': !main }"
    class="mb-6 flex items-center justify-between"
  >
    <div class="flex flex-col justify-start">
      <!--
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        color="light"
        class="mr-3"
        bg
      />
      <BaseIcon v-else-if="icon" :path="icon" class="mr-2" size="20" />-->
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight mb-3">
        {{ title }}
      </h1>
      <hr class="w-7/12 h-1 border-0 rounded bg-purple-600">
    </div>
    <slot v-if="hasSlot" />
    <!--<BaseButton v-else :icon="mdiCog" color="whiteDark" />-->
  </section>
</template>
