<template>
  <div
    class="mainWrapper columns is-flex is-justify-content-center is-align-content-center is-align-items-center"
  >
    <div class="column is-half" style="margin: 50%">
      <h1 class="has-text-centered mb-1 is-size-2">Minhas Tarefas</h1>
      <h3 class="has-text-centered mb-5">
        Não deixe para amanhã o que se pode fazer hoje!
      </h3>
      <div class="tabs is-centered">
        <ul>
          <li
            :class="{ 'is-active': activeMenu === 'Cadastrar' }"
            @click="changeToMenu('Cadastrar')"
          >
            <a>Cadastrar-se</a>
          </li>
          <li
            :class="{ 'is-active': activeMenu === 'Entrar' }"
            @click="changeToMenu('Entrar')"
          >
            <a>Entrar</a>
          </li>
        </ul>
      </div>

      <form class="has-text-centered">
        <div class="field">
          <label class="label">Usuário</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Usuário"
              v-model="username"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field mt-2">
          <label class="label">Senha</label>
          <div class="control has-icons-left">
            <input
              class="input"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>

            <span
              class="icon is-small"
              :style="{
                'cursor': 'pointer',
                'pointer-events': 'all !important',
                'color': showPassword ? 'black' : 'grey',
              }"
              @click="togglePassword"
            >
              <i class="fas fa-eye"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <p class="control has-text-center">
            <button
              class="button mt-3"
              :class="{
                'is-primary': activeMenu === 'Entrar',
                'is-info': activeMenu === 'Cadastrar',
              }"
              @click="submit"
            >
              {{ activeMenu }}
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .field {
    max-width: 25em;
    margin: auto;
  }
</style>

<script>
  import { ref, inject } from "vue";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const router = useRouter();
      const doLogin = inject("doLogin");

      const activeMenu = ref("Cadastrar");
      const username = ref("");
      const password = ref("");
      const showPassword = ref(false);

      const changeToMenu = menu => {
        activeMenu.value = menu;
        password.value = "";
        showPassword.value = false;
      };

      const togglePassword = () => {
        showPassword.value = !showPassword.value;
      };

      const submit = event => {
        if (activeMenu.value === "Cadastrar") {
          event.preventDefault();
          console.log("Cadastrar");
        }

        if (activeMenu.value === "Entrar") {
          event.preventDefault();
          console.log("Entrar");
          doLogin();
        }
      };

      return {
        activeMenu,
        changeToMenu,
        username,
        password,
        showPassword,
        togglePassword,
        submit,
      };
    },
  };
</script>
