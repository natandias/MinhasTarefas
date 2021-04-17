<template>
  <div class="mainWrapper">
    <!-- Navbar -->
    <nav
      class="navbar is-flex is-justify-content-space-between"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item">
          <h1 class="is-size-4">Minhas Tarefas</h1>
        </div>
      </div>

      <div
        class="nav-end is-flex is-flex-wrap-wrap-reverse is-justify-content-flex-end"
      >
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-info" @click="toggleModalCreateTask">
              Nova tarefa
            </a>
          </div>
        </div>

        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" @click="doLogout"> Sair </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Create Task Modal -->
    <div class="modal" :class="{ 'is-active': isCreateTaskModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Criar tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleModalCreateTask"
          ></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="label">Título da tarefa</label>
              <div class="control">
                <input class="input" type="text" v-model="newTask.title" />
              </div>
            </div>

            <div class="field">
              <label class="label">Descrição da tarefa</label>
              <div class="control">
                <input class="textarea" v-model="newTask.description" />
              </div>
            </div>

            <div class="field">
              <label class="label">Data limite da tarefa</label>
              <div class="control">
                <input class="input" type="date" v-model="newTask.deadline" />
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-flex-end">
          <button class="button" @click="toggleModalCreateTask">
            Cancelar
          </button>
          <button class="button is-success" @click="createTask">Criar</button>
        </footer>
      </div>
    </div>

    <!-- Columns -->
    <div class="columns is-gapless tasks">
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: aliceblue">
          <h1>Todas as tarefas</h1>
        </div>
        <div class="columnBody">
          <TaskCard
            taskId="1"
            title="Colocar comida para o cachorro"
            description="Lorem ipsum dolor sit amet consectetur"
            deadline="11:09 PM - 1 Jan 2016"
            firstActionText="Excluir"
            secondActionText="Executar"
            :firstActionFunction="deleteTask"
            :secondActionFunction="allTasksExecute"
          />
        </div>
      </div>
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: #2497d9">
          <h1>Em Andamento</h1>
        </div>
        <div class="columnBody">
          <TaskCard
            taskId="2"
            title="Colocar comida para o cachorro"
            description="Lorem ipsum dolor sit amet consectetur"
            deadline="11:09 PM - 1 Jan 2016"
            firstActionText="Excluir"
            secondActionText="Concluir"
            :firstActionFunction="deleteTask"
            :secondActionFunction="runningTasksConclude"
          />
        </div>
      </div>
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: #00d1b2">
          <h1>Concluídas</h1>
        </div>
        <div class="columnBody" style="border-right: none">
          <TaskCard
            taskId="3"
            title="Colocar comida para o cachorro"
            description="Lorem ipsum dolor sit amet consectetur"
            deadline="11:09 PM - 1 Jan 2016"
            firstActionText="Excluir"
            :firstActionFunction="deleteTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cardHeader {
    padding: 1em;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .columnBody {
    border-right: 1px solid grey;
    height: 100%;
    padding: 1em;
  }
</style>

<script>
  import { ref, inject, onMounted } from "vue";
  import TaskCard from "../components/TaskCard.vue";

  export default {
    components: {
      TaskCard,
    },
    setup() {
      const isLogged = inject("isLogged");
      const doLogout = inject("doLogout");

      const isCreateTaskModalOpen = ref(false);

      const newTask = ref({
        title: "",
        description: "",
        deadline: "",
      });

      const createTask = () => {
        console.log("newTask", newTask.value);
        console.log("newTaskTitle", newTask.value.title);
        console.log("newTaskDescription", newTask.value.description);
        console.log("newTaskDeadline", newTask.value.deadline);

        // REQUISIÇÃO HTTP AQUI

        toggleModalCreateTask();
      };

      const toggleModalCreateTask = () => {
        newTask.value = {
          title: "",
          description: "",
          deadline: "",
        };
        isCreateTaskModalOpen.value = !isCreateTaskModalOpen.value;
      };

      const deleteTask = taskId => {
        console.log("deleteTask", taskId);
      };

      const allTasksExecute = taskId => {
        console.log("allTasksExecute", taskId);
      };

      const runningTasksConclude = taskId => {
        console.log("runningTasksConclude", taskId);
      };

      onMounted(() => {
        console.log("isLogged", isLogged.value);
      });

      return {
        doLogout,
        toggleModalCreateTask,
        isCreateTaskModalOpen,
        newTask,
        createTask,
        deleteTask,
        allTasksExecute,
        runningTasksConclude,
      };
    },
  };
</script>
