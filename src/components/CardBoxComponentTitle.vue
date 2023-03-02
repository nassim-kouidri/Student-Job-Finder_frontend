<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  underlined: {
    type: Boolean,
    required: false,
  },
  centered: {
    type: Boolean,
    required: false,
  }
});
</script>

<template>
  <div class="flex flex-col justify-center mb-4 w-full" :class="{'items-center': centered}">
    <h1 class="text-2xl mb-2">
      {{ title }}
    </h1>
    <hr v-show="underlined" class="w-7/12 h-1 border-0 rounded bg-purple-600">
    <slot />
  </div>
</template>
