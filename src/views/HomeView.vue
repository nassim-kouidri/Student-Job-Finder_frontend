<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import OfferComponent from "@/components/OfferComponent.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <OfferComponent />
    </SectionMain>
  </LayoutAuthenticated>
  <Footer />
</template>
