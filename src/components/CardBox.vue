<script setup>
import { computed, useSlots } from "vue";
import CardBoxComponentBody from "@/components/CardBoxComponentBody.vue";
import CardBoxComponentFooter from "@/components/CardBoxComponentFooter.vue";

const props = defineProps({
  rounded: {
    type: String,
    default: "rounded-lg",
  },
  flex: {
    type: String,
    default: "flex-col",
  },
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  isForm: Boolean,
  isHoverable: Boolean,
  isModal: Boolean,
  isFixed: Boolean,
});

const emit = defineEmits(["submit"]);

const slots = useSlots();

const hasFooterSlot = computed(() => slots.footer && !!slots.footer());

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.isModal ? "dark:bg-slate-900" : "dark:bg-slate-900/70",
    props.isFixed ? "fixed lg:w-[24rem] top-40" : "",
  ];

  if (props.isHoverable) {
    base.push(
      "hover:border-purple-700 transition-border duration-100 cursor-pointer hover:dark:border-purple-700"
    );
  }

  return base;
});

const submit = (event) => {
  emit("submit", event);
};
</script>

<template>
  <component
    :is="isForm ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex border-2 border-interit dark:border-slate-700"
    @submit="submit"
  >
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <CardBoxComponentBody :no-padding="hasTable">
        <slot />
      </CardBoxComponentBody>
      <CardBoxComponentFooter v-show="hasFooterSlot">
        <slot name="footer" />
      </CardBoxComponentFooter>
    </template>
  </component>
</template>
