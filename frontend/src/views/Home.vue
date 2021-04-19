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
            <a class="button is-info" @click="toggleTaskModal"> Nova tarefa </a>
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
    <div class="modal" :class="{ 'is-active': isTaskModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ isUpdatingTask ? "Editar tarefa" : "Nova tarefa" }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleTaskModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="label">Título da tarefa</label>
              <div class="control">
                <input class="input" type="text" v-model="task.title" />
              </div>
            </div>

            <div class="field">
              <label class="label">Descrição da tarefa</label>
              <div class="control">
                <textarea class="textarea" v-model="task.description" />
              </div>
            </div>

            <div class="field">
              <label class="label">Data limite da tarefa</label>
              <div class="control">
                <input class="input" type="date" v-model="task.deadlineDate" />
              </div>
            </div>

            <div class="field">
              <label class="label">Horário limite da tarefa</label>
              <div class="control">
                <input class="input" type="time" v-model="task.deadlineHour" />
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-flex-end">
          <button class="button" @click="toggleTaskModal">Cancelar</button>
          <button
            class="button is-success"
            @click="isUpdatingTask ? updateTask() : createTask()"
          >
            {{ isUpdatingTask ? "Atualizar" : "Criar" }}
          </button>
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
            secondActionText="Editar"
            thirdActionText="Executar"
            :firstActionFunction="deleteTask"
            :secondActionFunction="toggleModalEditTask"
            :thirdActionFunction="allTasksExecute"
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
            secondActionText="Editar"
            thirdActionText="Concluir"
            :firstActionFunction="deleteTask"
            :secondActionFunction="toggleModalEditTask"
            :thirdActionFunction="runningTasksConclude"
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
  import api from "../services/api";

  import { ref, inject, onMounted } from "vue";
  import TaskCard from "../components/TaskCard.vue";

  export default {
    components: {
      TaskCard,
    },
    setup() {
      const doLogout = inject("doLogout");

      const isTaskModalOpen = ref(false);
      const isUpdatingTask = ref(false);

      const task = ref({
        title: "",
        description: "",
        deadlineDate: "",
        deadlineHour: "",
      });

      const allTasks = ref([]);

      const getAllTasks = async () => {
        console.log("getAllTasks");
        const allTasksFromReq = await api.makeHttpRequest(
          "GET",
          "tasks",
          {},
          true
        );
        allTasks.value = allTasksFromReq;

        console.log("allTasksFromReq", allTasksFromReq);
      };

      const createTask = () => {
        console.log("newTask", task.value);
        console.log("newTaskTitle", task.value.title);
        console.log("newTaskDescription", task.value.description);
        console.log("newTaskDeadline", task.value.deadline);

        // REQUISIÇÃO HTTP AQUI

        toggleTaskModal();
      };

      const toggleTaskModal = () => {
        task.value = {
          title: "",
          description: "",
          deadline: "",
        };
        isTaskModalOpen.value = !isTaskModalOpen.value;
        isUpdatingTask.value = false;
      };

      const deleteTask = taskId => {
        console.log("deleteTask", taskId);
      };

      const toggleModalEditTask = taskId => {
        task.value = {
          title: "taskId",
          description: "taskId",
          deadlineDate: "2021-04-29",
          deadlineHour: "22:45",
        };
        isUpdatingTask.value = true;
        isTaskModalOpen.value = !isTaskModalOpen.value;
      };

      const updateTask = () => {
        console.log("updateTask", task.value);
      };

      const allTasksExecute = taskId => {
        console.log("allTasksExecute", taskId);
      };

      const runningTasksConclude = taskId => {
        console.log("runningTasksConclude", taskId);
      };

      onMounted(() => {
        getAllTasks();
      });

      return {
        doLogout,
        toggleTaskModal,
        isTaskModalOpen,
        task,
        createTask,
        deleteTask,
        updateTask,
        isUpdatingTask,
        toggleModalEditTask,
        allTasksExecute,
        runningTasksConclude,
      };
    },
  };
</script>
