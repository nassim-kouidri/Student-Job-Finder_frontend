<script setup>
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
    title: String,
    icon: String,
})

</script>


<template>
    <div class="w-full flex flex-col space-y-2">
      <div class="flex items-center space-x-4">
        <BaseIcon
          :path="icon"
          size="25"
        />
        <div class="text-xl">{{ title }}</div>
      </div>
      <div class="pl-8">
        <slot />
      </div>
      
    </div>

</template>