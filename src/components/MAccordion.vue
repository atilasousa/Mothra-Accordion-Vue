<template>
  <div :class="mAccordionClass()">
    <div :class="mAccordionClass('header')">
      <h1>{{ title }}</h1>
      <button @click="handleToggle">
        <font-awesome-icon :icon="`fa-solid fa-${iconType}`" />
      </button>
    </div>
    <Transition>
      <div v-show="showContent" :class="mAccordionClass('content')">
        <slot />
        <div v-if="showActionsButton" :class="mAccordionClass('actions')">
          <button @click="handleToggle" class="btn">
            {{ cancelBtnText }}
          </button>
          <button @click="$emit('confirm')" class="btn">
            {{ confirmBtnText }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import bem from "bem-ts";

const mAccordionClass = bem("m-accordion", { strict: false });
withDefaults(
  defineProps<{
    content?: string;
    title: string;
    headerBackground?: string;
    contentBackground?: string;
    cancelBtnText?: string;
    confirmBtnText?: string;
    confirmBtnColor?: string;
    showActionsButton?: boolean;
  }>(),
  {
    cancelBtnText: "Cancel",
    confirmBtnText: "Confirm",
    headerBackground: "#2a9d8f",
    contentBackground: "white",
    confirmBtnColor: "#2a9d8f",
    showActionsButton: false,
  }
);

const showContent = ref(false);

const handleToggle = () => {
  showContent.value = !showContent.value;
};

const borderRadius = computed(() =>
  !showContent.value ? "1rem" : "1rem 1rem 0 0"
);

const iconType = computed(() => (showContent.value ? "minus" : "plus"));
</script>
<style lang="scss">
.m-accordion {
  border-radius: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &__header {
    text-align: left;
    padding: 0 1rem;
    font-size: 0.7rem;
    border-radius: v-bind(borderRadius);
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: v-bind(headerBackground);

    button {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      background: none;
      color: white;

      &:hover {
        background-color: #b9b9b9b2;
      }
    }
  }

  &__content {
    padding: 1rem;
    text-align: left;
    border-radius: 0 0 1rem 1rem;
    overflow-wrap: break-word;
    background-color: v-bind(contentBackground);
    color: #444444;
  }

  &__actions {
    text-align: right;
    margin-top: 0.5rem;
    border-top: 0.1px solid #dfdfdf;
    padding-top: 0.5rem;
    margin-top: 1.5rem;

    button {
      padding: 0.6rem;
      border-radius: 0.7rem;
      font-size: 0.9rem;
      font-weight: 500;
      border: none;
      cursor: pointer;

      &:only-child {
        margin: 0;
      }

      &:first-child {
        margin-right: 0.5rem;
        background: none;
        color: #444444;

        &:hover {
          background-color: rgba(207, 207, 207, 0.39);
          color: #444444;
        }
      }

      &:last-child {
        margin-right: 0;
        background-color: v-bind(confirmBtnColor);
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
