<script setup>
import { ref } from "vue";
import MAccordion from "./components/MAccordion.vue";

const content = ref(
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aliquam molestiae iste suscipit. Quae dolore eum facere, at laudantium molestiae eos libero odio ipsum et quam provident nobis. Enim, assumenda?"
);

const handleConfirm = () => alert("confirmado");
</script>

<template>
  <div class="card">
    <m-accordion
      v-for="i in 3"
      :key="i"
      title="Título"
      @confirm="handleConfirm"
      borderRadius="1rem"
      showActionsButton
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, ex?
      Reiciendis atque officiis nesciunt. Tempora reiciendis cumque earum quo
      voluptate, nam illum provident aspernatur saepe vitae expedita iusto
      officiis iste?
    </m-accordion>
  </div>
</template>

<style scoped>
.card {
  width: 50rem;
}
</style>
