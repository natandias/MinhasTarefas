<template>
  <router-view />
</template>

<script>
  import { provide, ref, watch } from "vue";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const router = useRouter();

      const doLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");

        router.push("/");
      };

      provide("doLogout", doLogout);
    },
  };
</script>

<style>
  * {
    margin: 0;
    width: auto;
    height: auto;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    overflow: hidden;
  }
  .mainWrapper {
    margin: 0;
    background-image: radial-gradient(#f6f6f6, #e9e9e9, #a5a5a5);
    /* background: #f7f7f7; */
    /* overflow-y: scroll; */
    height: 100%;
    overflow-y: auto;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 18px;
    margin: 0;
    padding: 0;
    border: 0;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
