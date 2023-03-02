<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: null,
  },
});

const avatar = computed(() => props.avatar ?? localStorage.getItem("image"));

const username = computed(() => props.username);
</script>

<template>
  <div
    class="rounded-full block bg-gray-100 dark:bg-slate-800 overflow-hidden flex items-center"
  >
    <img :src="avatar" :alt="username" class="min-h-full" />
    <slot />
  </div>
</template>
