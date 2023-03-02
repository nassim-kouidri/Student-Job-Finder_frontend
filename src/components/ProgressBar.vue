<template>
  <div class="stepper-wrapper">
    <div :class="stepOne ? 'stepper-item completed' : 'stepper-item active'">
      <div class="step-counter">1</div>
      <div class="step-name">Etape 1</div>
    </div>
    <div :class="stepTwo ? 'stepper-item completed' : 'stepper-item active'">
      <div class="step-counter">2</div>
      <div class="step-name">Etape 2</div>
    </div>
    <div :class="stepThree ? 'stepper-item completed' : 'stepper-item active'">
      <div class="step-counter">3</div>
      <div class="step-name">Etape 3</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  stepOne: {
    type: Boolean,
    required: true,
  },
  stepTwo: {
    type: Boolean,
    required: true,
  },
  stepThree: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.stepper-wrapper {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.stepper-item::before {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: -50%;
  z-index: 2;
}

.stepper-item::after {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 2;
}

.stepper-item .step-counter {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 6px;
}

.stepper-item.active {
  font-weight: bold;
}

.stepper-item.completed .step-counter {
  background-color: #7528c9;
}

.step-counter {
  color: white;
}

.stepper-item.completed::after {
  position: absolute;
  content: "";
  border-bottom: 2px solid #7528c9;
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 3;
}

.stepper-item:first-child::before {
  content: none;
}
.stepper-item:last-child::after {
  content: none;
}
</style>
