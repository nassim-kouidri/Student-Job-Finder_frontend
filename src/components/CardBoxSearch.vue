<script setup>
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";

import { mdiMagnify, mdiMapMarker, mdiFileSign } from "@mdi/js";

const contractList = ["CDD", "CDI", "Stage", "Alternance"];
</script>

<template>
  <CardBox is-form @submit.prevent="search" isFixed>
    <FormField>
      <FormControl
        :icon="mdiMagnify"
        name="search"
        type="text"
        placeholder="Recherchez par job, mot-clé..."
      />
    </FormField>
    <FormField>
      <FormControl
        :icon="mdiMapMarker"
        name="location"
        type="text"
        placeholder="Où ?"
      />
    </FormField>
    <FormField>
      <FormControl
        :icon="mdiFileSign"
        name="contract"
        type="select"
        :options="contractList"
      />
    </FormField>
    <template #footer>
      <BaseButton
        type="submit"
        color="info"
        label="Rechercher"
        :icon="mdiMagnify"
        iconSize="25"
      />
    </template>
  </CardBox>
</template>
