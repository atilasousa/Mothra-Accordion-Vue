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
          <button @click="emitConfirm" class="btn">
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

const $emit = defineEmits<{
  (e: "confirm"): void;
}>();

const props = withDefaults(
  defineProps<{
    title: string;
    headerBackground?: string;
    contentBackground?: string;
    cancelBtnText?: string;
    confirmBtnText?: string;
    confirmBtnColor?: string;
    btnRadius?: string;
    showActionsButton?: boolean;
    borderRadius?: string;
  }>(),
  {
    cancelBtnText: "Cancel",
    confirmBtnText: "Confirm",
    headerBackground: "#2a9d8f",
    contentBackground: "white",
    confirmBtnColor: "#2a9d8f",
    showActionsButton: false,
    borderRadius: "1rem",
    btnRadius: "1rem",
  }
);

const showContent = ref(false);

const handleToggle = () => {
  showContent.value = !showContent.value;
};

const borderRdHeader = computed(() =>
  !showContent.value
    ? `${props.borderRadius}`
    : `${props.borderRadius} ${props.borderRadius} 0 0`
);

const borderRdContent = computed(
  () => `0 0 ${props.borderRadius} ${props.borderRadius} `
);

const emitConfirm = () => {
  $emit("confirm");
  handleToggle();
};

const iconType = computed(() => (showContent.value ? "minus" : "plus"));
</script>
<style lang="scss">
.m-accordion {
  border-radius: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  &:last-child {
    border-bottom: none;

    .m-accordion {
      &__header {
        border-bottom: none;
      }
    }
  }

  &__header {
    text-align: left;
    padding: 0 1rem;
    font-size: 0.7rem;
    border-radius: v-bind(borderRdHeader);
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
    border-radius: v-bind(borderRdContent);
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
      border-radius: v-bind(btnRadius);
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
