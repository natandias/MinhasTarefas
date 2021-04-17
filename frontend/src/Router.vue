<script>
  import { createWebHistory, createRouter } from "vue-router";
  import SignUpAndLogin from "./views/SignUpAndLogin.vue";
  import Home from "./views/Home.vue";
  import NotFound from "./views/NotFound.vue";

  import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

  const routes = [
    {
      path: "/",
      name: "SignUpAndLogin",
      component: SignUpAndLogin,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;
</script>
