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
                <input class="input" type="time" v-model="task.deadlineTime" />
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

    <!-- Modal Confirm Delete -->
    <div class="modal" :class="{ 'is-active': isModalConfirmDeleteOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ "Deseja mesmo excluir essa tarefa?" }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleModalConfirmDeleteTask"
          ></button>
        </header>
        <section class="modal-card-body">
          <p>Essa operação não pode ser revertida!</p>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-flex-end">
          <button class="button" @click="toggleModalConfirmDeleteTask">
            Cancelar
          </button>
          <button class="button is-danger" @click="deleteTask">
            {{ "Deletar" }}
          </button>
        </footer>
      </div>
    </div>

    <!-- Alert de erro -->
    <transition name="slide-fade">
      <div
        class="notification is-danger is-open"
        style="
          position: absolute;
          width: fit-content;
          height: fit-content;
          top: 0;
          right: 0;
          margin-top: 1em;
          margin-right: 1em;
        "
        v-show="isErrorOpen"
      >
        <button class="delete" @click="toggleIsError"></button>
        {{ errorMessage }}
      </div>
    </transition>

    <!-- Columns -->
    <div class="columns is-gapless tasks">
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: aliceblue">
          <h1>Todas as tarefas</h1>
        </div>
        <div class="columnBody is-flex is-flex-direction-column">
          <TaskCard
            v-for="task in allTasks.created"
            :key="task.id"
            :taskId="task.id"
            :title="task.title"
            :description="task.description"
            :deadlineDate="task.deadlineDate"
            :deadlineTime="task.deadlineTime"
            firstActionText="Excluir"
            secondActionText="Editar"
            thirdActionText="Executar"
            :firstActionFunction="toggleModalConfirmDeleteTask"
            :secondActionFunction="toggleModalEditTask"
            :thirdActionFunction="updateTaskStatus"
          />
        </div>
      </div>
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: #2497d9">
          <h1>Em Andamento</h1>
        </div>
        <div class="columnBody is-flex is-flex-direction-column">
          <TaskCard
            v-for="task in allTasks.executing"
            :key="task.id"
            :taskId="task.id"
            :title="task.title"
            :description="task.description"
            :deadlineDate="task.deadlineDate"
            :deadlineTime="task.deadlineTime"
            firstActionText="Excluir"
            secondActionText="Editar"
            thirdActionText="Concluir"
            :firstActionFunction="toggleModalConfirmDeleteTask"
            :secondActionFunction="toggleModalEditTask"
            :thirdActionFunction="updateTaskStatus"
          />
        </div>
      </div>
      <div class="column">
        <div class="cardHeader has-text-centered" style="background: #00d1b2">
          <h1>Concluídas</h1>
        </div>
        <div
          class="columnBody is-flex is-flex-direction-column"
          style="border-right: none"
        >
          <TaskCard
            v-for="task in allTasks.conluded"
            :key="task.id"
            :taskId="task.id"
            :title="task.title"
            :description="task.description"
            :deadlineDate="task.deadlineDate"
            :deadlineTime="task.deadlineTime"
            firstActionText="Excluir"
            secondActionText="Não concluiu?"
            :firstActionFunction="toggleModalConfirmDeleteTask"
            :secondActionFunction="updateTaskStatus"
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
    gap: 2em;
  }
  .cards {
    gap: 2em;
  }
</style>

<script>
  import api from "../services/api";

  import { ref, computed, inject, onMounted } from "vue";
  import TaskCard from "../components/TaskCard.vue";

  export default {
    components: {
      TaskCard,
    },
    setup() {
      const doLogout = inject("doLogout");

      const isTaskModalOpen = ref(false);
      const isUpdatingTask = ref(false);

      const isModalConfirmDeleteOpen = ref(false);

      const isErrorOpen = ref(false);
      const errorMessage = ref("");

      const task = ref({
        id: null,
        title: "",
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      });

      const taskSelectId = ref(null);

      const allTasks = ref({
        created: [],
        executing: [],
        conluded: [],
      });

      const allTasksStored = computed(() => {
        return [
          ...allTasks.value.created,
          ...allTasks.value.executing,
          ...allTasks.value.conluded,
        ];
      });

      const getAllTasks = async () => {
        const allTasksFromReq = await api.makeHttpRequest(
          "GET",
          "tasks",
          {},
          true
        );
        allTasks.value = {
          created: allTasksFromReq.filter(item => item.status === "created"),
          executing: allTasksFromReq.filter(
            item => item.status === "executing"
          ),
          conluded: allTasksFromReq.filter(item => item.status === "concluded"),
        };

        console.log("concluded tasks", allTasks.value.conluded);
      };

      const createTask = async () => {
        const { title, description, deadlineDate, deadlineTime } = task.value;

        const createTaskResult = await api.makeHttpRequest(
          "POST",
          `tasks`,
          {
            title,
            description,
            deadlineDate,
            deadlineTime,
          },
          true
        );

        if (
          createTaskResult.error &&
          typeof createTaskResult.error === "string"
        ) {
          errorMessage.value = createTaskResult.error;
        } else {
          errorMessage.value = "Tente novamente mais tarde!";
        }

        getAllTasks();
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

      const deleteTask = async () => {
        const deleteTaskResult = await api.makeHttpRequest(
          "DELETE",
          `tasks/${taskSelectId.value}`,
          {},
          true
        );

        if (
          deleteTaskResult.error &&
          typeof deleteTaskResult.error === "string"
        ) {
          errorMessage.value = deleteTaskResult.error;
        } else {
          errorMessage.value = "Tente novamente mais tarde!";
        }

        getAllTasks();
        toggleModalConfirmDeleteTask();
      };

      const toggleModalConfirmDeleteTask = taskId => {
        if (taskId) taskSelectId.value = taskId;
        isModalConfirmDeleteOpen.value = !isModalConfirmDeleteOpen.value;
      };

      const toggleModalEditTask = taskId => {
        const taskSelected = allTasksStored.value.filter(
          task => task.id === taskId
        );

        const {
          id,
          title,
          description,
          deadlineDate,
          deadlineTime,
        } = taskSelected[0];

        task.value = {
          id,
          title,
          description,
          deadlineDate,
          deadlineTime,
        };

        isUpdatingTask.value = true;
        isTaskModalOpen.value = !isTaskModalOpen.value;
      };

      const updateTask = async () => {
        const {
          id,
          title,
          description,
          deadlineDate,
          deadlineTime,
        } = task.value;

        const updateTaskResult = await api.makeHttpRequest(
          "PUT",
          `tasks/${id}`,
          {
            title,
            description,
            deadlineDate,
            deadlineTime,
          },
          true
        );

        if (
          updateTaskResult.error &&
          typeof updateTaskResult.error === "string"
        ) {
          errorMessage.value = updateTaskResult.error;
        } else {
          errorMessage.value = "Tente novamente mais tarde!";
        }

        getAllTasks();
        toggleTaskModal();
      };

      const updateTaskStatus = async taskId => {
        const taskSelected = allTasksStored.value.filter(
          task => task.id === taskId
        );

        let status = "created";
        if (taskSelected[0].status === "created") status = "executing";
        if (taskSelected[0].status === "executing") status = "concluded";
        if (taskSelected[0].status === "concluded") status = "executing";

        const updateTaskResult = await api.makeHttpRequest(
          "PATCH",
          `tasks/${taskId}/status`,
          {
            status,
          },
          true
        );

        if (
          updateTaskResult.error &&
          typeof updateTaskResult.error === "string"
        ) {
          errorMessage.value = updateTaskResult.error;
        } else {
          errorMessage.value = "Tente novamente mais tarde!";
        }

        getAllTasks();
      };

      const toggleIsError = () => {
        isErrorOpen.value = !isErrorOpen.value;
      };

      onMounted(() => {
        getAllTasks();
      });

      return {
        doLogout,
        toggleTaskModal,
        isTaskModalOpen,
        allTasks,
        task,
        createTask,
        toggleModalConfirmDeleteTask,
        deleteTask,
        isModalConfirmDeleteOpen,
        updateTask,
        isUpdatingTask,
        toggleModalEditTask,
        updateTaskStatus,
        isErrorOpen,
        errorMessage,
        toggleIsError,
      };
    },
  };
</script>
