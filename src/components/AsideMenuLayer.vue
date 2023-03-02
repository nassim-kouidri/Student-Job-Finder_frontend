<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/AsideMenuList.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import LogoSJF from "@/assets/Logo-PSD.png";
import BaseDivider from "@/components/BaseDivider.vue";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);

const styleStore = useStyleStore();

const logoutItem = computed(() => ({
  label: "Se déconnecter",
  icon: mdiLogout,
  color: "info",
  isLogout: true,
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event) => {
  emit("aside-lg-close-click", event);
};
</script>

<template>
  <aside
    id="aside"
    class="w-64 fixed flex z-40 top-0 h-screen bg-green transition-position overflow-hidden"
  >
    <div
      :class="styleStore.asideStyle"
      class="rounded h-screen flex-1 flex flex-col overflow-hidden dark:bg-slate-900"
    >
      <div
        :class="styleStore.asideBrandStyle"
        class="flex flex-row h-14 items-center justify-between dark:bg-slate-900"
      >
        <div
          class="text-center flex justify-center w-full lg:text-left lg:pl-6 xl:text-center xl:pl-0"
        >
          <img :src="LogoSJF" class="w-36" />
        </div>
        <button
          class="hidden lg:inline-block xl:hidden p-3"
          @click.prevent="asideLgCloseClick"
        >
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        :class="
          styleStore.darkMode
            ? 'aside-scrollbars-[slate]'
            : styleStore.asideScrollbarsStyle
        "
        class="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <BaseDivider />
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul class="">
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" isLogout="true" />
      </ul>
    </div>
  </aside>
</template>
