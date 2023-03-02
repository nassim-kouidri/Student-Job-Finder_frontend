<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import menuNavBar from "@/menuNavBar.js";
import menuNavBarUser from "@/menuNavBarUser.js";
import menuNavBarGuest from "@/menuNavBarGuest.js";
import menuNavBarSwitchDark from "@/menuNavBarSwitchDark.js";
import BaseIcon from "@/components/BaseIcon.vue";
import FormControl from "@/components/FormControl.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import Footer from "@/components/Footer.vue";
import LogoSJF from "@/assets/Logo-PSD.png";
import { accountService } from "@/_services";

const layoutAsidePadding = "xl:pl-0";

const styleStore = useStyleStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    localStorage.removeItem("image");
    localStorage.removeItem("userName");
    localStorage.removeItem("userFname");
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    useMainStore().isLogged = false;
    accountService.logout();
    router.push("/login");
  }
};
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 h-full min-h-screen transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :menuUser="menuNavBarUser"
        :menuGuest="menuNavBarGuest"
        :menuSwitch="menuNavBarSwitchDark"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
      </NavBar>
      <slot />
    </div>
  </div>
</template>
