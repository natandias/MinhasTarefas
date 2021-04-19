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
        <p>
          {{
            typeof deadlineDate === "string" && new Date(deadlineDate)
              ? new Intl.DateTimeFormat("pt-BR").format(
                  new Date(deadlineDate.split("-"))
                )
              : deadlineDate
          }}
          -
          {{ deadlineTime }}
        </p>
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
      <a
        href="#"
        @click="thirdActionFunction(taskId)"
        class="card-footer-item"
        >{{ thirdActionText }}</a
      >
    </footer>
  </div>
</template>

<script>
  import { ref, inject, onMounted } from "vue";

  export default {
    props: {
      taskId: Number,
      title: String,
      description: String,
      deadlineDate: String,
      deadlineTime: String,
      firstActionText: String,
      secondActionText: String,
      thirdActionText: String,
      firstActionFunction: Function,
      secondActionFunction: Function,
      thirdActionFunction: Function,
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
