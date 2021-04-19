<template>
  <div
    class="mainWrapper columns is-flex is-justify-content-center is-align-content-center is-align-items-center"
  >
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

    <div
      class="notification is-primary is-open"
      style="
        position: absolute;
        width: fit-content;
        height: fit-content;
        top: 0;
        right: 0;
        margin-top: 1em;
        margin-right: 1em;
      "
      v-show="isSuccessOpen"
    >
      {{ successMessage }}
    </div>

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
  .fade-enter-active,
  /* Animações de entrada e saída podem utilizar diferentes  */
/* funções de duração e de tempo.                          */
.slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<script>
  import api from "../services/api";

  import { ref, inject } from "vue";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const router = useRouter();

      const isErrorOpen = ref(false);
      const errorMessage = ref("");

      const isSuccessOpen = ref(false);
      const successMessage = ref("");

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

      const toggleIsError = () => {
        isErrorOpen.value = !isErrorOpen.value;
      };

      const submit = event => {
        const doLogin = async (username, password) => {
          const loginReqResult = await api.makeHttpRequest(
            "POST",
            "users/login",
            {
              username,
              password,
            },
            false
          );

          console.log("loginReqResult", loginReqResult);

          if (!loginReqResult.success) {
            if (
              loginReqResult.error &&
              typeof loginReqResult.error === "string"
            ) {
              errorMessage.value = loginReqResult.error;
            } else {
              errorMessage.value = "Tente novamente mais tarde!";
            }

            isErrorOpen.value = true;
            setTimeout(() => {
              isErrorOpen.value = false;
            }, 2000);
            return false;
          }

          localStorage.setItem("user_id", loginReqResult.userId);
          localStorage.setItem("token", loginReqResult.token);

          if (loginReqResult.success) router.push("/home");
        };

        if (activeMenu.value === "Entrar") {
          event.preventDefault();
          doLogin(username.value, password.value);
        }

        if (activeMenu.value === "Cadastrar") {
          event.preventDefault();
          const signUp = async (username, password) => {
            const signUpReqResult = await api.makeHttpRequest(
              "POST",
              "users",
              {
                username,
                password,
              },
              false
            );

            console.log("signUpReqResult", signUpReqResult);

            if (!signUpReqResult.success) {
              if (
                signUpReqResult.error &&
                typeof signUpReqResult.error === "string"
              ) {
                errorMessage.value = signUpReqResult.error;
              } else {
                errorMessage.value = "Tente novamente mais tarde!";
              }
              isErrorOpen.value = true;

              setTimeout(() => {
                isErrorOpen.value = false;
              }, 2000);
              return false;
            }

            localStorage.setItem("user_id", signUpReqResult.userId);
            localStorage.setItem("token", signUpReqResult.token);

            if (signUpReqResult.success) {
              isSuccessOpen.value = true;
              successMessage.value =
                "Cadastro concluído! Você será redirecionado para sua tela inicial";
              setTimeout(() => {
                doLogin(username, password);
              }, 2000);
            }
          };

          signUp(username.value, password.value);
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
        isErrorOpen,
        toggleIsError,
        errorMessage,
        isSuccessOpen,
        successMessage,
      };
    },
  };
</script>
