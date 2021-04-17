<template>
  <div
    style="background-color: #e8e8e8"
    class="mainWrapper columns is-centered"
  >
    <div
      class="column is-full is-flex is-flex-direction-column is-justify-content-center is-align-content-center"
    >
      <button class="button is-link" @click="router.push('/')">Voltar</button>
      <img src="../assets/404.jpg" alt="404 Error" style="margin: auto" />
    </div>
  </div>
</template>

<script>
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const router = useRouter();

      return { router };
    },
  };
</script>
