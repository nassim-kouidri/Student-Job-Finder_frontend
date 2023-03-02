<script setup>
import { useMainStore } from "@/stores/main";
import UserAvatar from "@/components/UserAvatar.vue";

const mainStore = useMainStore();

const props = defineProps({
  avatar: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <UserAvatar :avatar="avatar">
    <slot />
  </UserAvatar>
</template>
