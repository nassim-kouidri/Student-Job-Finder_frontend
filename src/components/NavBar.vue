<script setup>
import { ref, reactive, computed } from "vue";
import { mdiClose, mdiDotsVertical } from "@mdi/js";
import { containerMaxW } from "@/config.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBarMenuList from "@/components/NavBarMenuList.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import LogoSJF from "@/assets/Logo-PSD.png";
import LogoSJFDM from "@/assets/Logo-PSD-darkmode.png";
import BaseButton from "@/components/BaseButton.vue";
import { accountService } from "@/_services";
import Cookies from "js-cookie";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
  menuUser: {
    type: Array,
    required: false,
  },
  menuGuest: {
    type: Array,
    required: false,
  },
  menuSwitch: {
    type: Array,
    required: false,
  },
});

const styleStore = useStyleStore();

const emit = defineEmits(["menu-click"]);

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
const isMenuNavBarActive = ref(false);

const isLogged = Cookies.get("userIsLogged");
</script>

<template>
  <nav
    class="border-b border-gray-200 top-0 inset-x-0 fixed bg-gray-50 h-14 z-30 transition-position w-screen lg:w-auto dark:bg-slate-800 dark:border-slate-800"
  >
    <div class="flex lg:items-stretch" :class="containerMaxW">
      <div class="flex flex-1 items-stretch h-14">
        <NavBarItemPlain>
          <RouterLink to="/"
            ><img
              class="h-10 w-30"
              :src="styleStore.darkMode ? LogoSJFDM : LogoSJF"
          /></RouterLink>
        </NavBarItemPlain>
        <slot />
      </div>
      <div class="flex-none items-stretch flex h-14 lg:hidden">
        <NavBarItemPlain
          @click.prevent="isMenuNavBarActive = !isMenuNavBarActive"
        >
          <BaseIcon
            :path="isMenuNavBarActive ? mdiClose : mdiDotsVertical"
            size="24"
          />
        </NavBarItemPlain>
      </div>
      <div
        class="max-h-screen-menu overflow-y-auto items-center lg:overflow-visible absolute w-screen top-14 left-0 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none dark:bg-transparent"
        :class="[isMenuNavBarActive ? 'block bg-gray-50' : 'hidden']"
      >
        <NavBarMenuList :menu="menu" @menu-click="menuClick" />
        <NavBarMenuList
          :menu="isLogged ? menuUser : menuGuest"
          @menu-click="menuClick"
        />
        <NavBarMenuList :menu="menuSwitch" @menu-click="menuClick" />
      </div>
    </div>
  </nav>
</template>
