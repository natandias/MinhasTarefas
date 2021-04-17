<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <button
        class="card-header-icon"
        aria-label="more options"
        @click="toggleDescription"
      >
        <span class="icon">
          <i
            class="fas"
            :class="isDescriptionVisible ? 'fa-angle-up' : 'fa-angle-down'"
            aria-hidden="true"
          ></i>
        </span>
      </button>
    </header>
    <div class="card-content" v-show="isDescriptionVisible">
      <div class="content">
        {{ description }}
        <br />
        <p>{{ deadline }}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a
        href="#"
        @click="firstActionFunction(taskId)"
        class="card-footer-item"
        >{{ firstActionText }}</a
      >
      <a
        href="#"
        @click="secondActionFunction(taskId)"
        class="card-footer-item"
        >{{ secondActionText }}</a
      >
    </footer>
  </div>
</template>

<style scoped>
  /* .cardHeader {
    padding: 1em;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .columnBody {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
    height: 100%;
    padding: 1em;
  } */
</style>

<script>
  import { ref, inject, onMounted } from "vue";

  export default {
    props: {
      taskId: String,
      title: String,
      description: String,
      deadline: String,
      firstActionText: String,
      secondActionText: String,
      firstActionFunction: Function,
      secondActionFunction: Function,
    },

    setup() {
      const isDescriptionVisible = ref(false);

      const toggleDescription = () => {
        isDescriptionVisible.value = !isDescriptionVisible.value;
      };

      return { isDescriptionVisible, toggleDescription };
    },
  };
</script>

<style></style>
