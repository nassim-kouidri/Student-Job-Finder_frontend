<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasDone: Boolean,
  hasCancel: Boolean,
  hasClose: Boolean,
  small: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  withAction: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});

const componentClass = computed(() => {
  const base = [
    props.small ? "w-[30rem] h-50" : "w-8/12 max-h-5/6 h-auto overflow-auto",
  ];
  return base;
});
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="shadow-lg z-50 border-0"
      is-modal
      :class="componentClass"
    >
      <div class="flex items-center">
        <CardBoxComponentTitle :title="title" />
        <BaseButton v-if="hasClose" :icon="mdiClose" @click="cancel" />
      </div>
      <slot />
      <template #footer>
        <BaseButtons>
          <BaseButton
            v-if="hasDone"
            :label="buttonLabel"
            color="info"
            @click="confirm"
          />
          <BaseButton
            class="relative top-0 left-0"
            v-if="hasCancel"
            label="Annuler"
            color="danger"
            outline
            @click="cancel"
          />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
