const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");
const TaskController = require("./controllers/TaskController");
const authorizeUser = require("./middlewares/authorizeUser");

router.get("/api/users", UserController.GetUsers);
router.post("/api/users", UserController.CreateUser);
router.post("/api/users/login", UserController.Login);
router.put("/api/users/:id", UserController.UpdateUser);
router.delete("/api/users/:id", UserController.DeleteUser);

// Autenticação das rotas de tarefas
router.use("/api/tasks", authorizeUser);

router.get("/api/tasks", TaskController.GetTasks);
router.post("/api/tasks", TaskController.CreateTask);
router.put("/api/tasks/:id", TaskController.UpdateTask);
router.patch("/api/tasks/:id/status", TaskController.UpdateTaskStatus);
router.delete("/api/tasks/:id", TaskController.DeleteTask);

module.exports = router;
