const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");
const TaskController = require("./controllers/TaskController");

router.get("/api/users", UserController.GetUser);
router.post("/api/users", UserController.CreateUser);
router.post("/api/users/login", UserController.Login);
router.put("/api/users/:id", UserController.UpdateUser);
router.delete("/api/users/:id", UserController.DeleteUser);

router.get("/api/tasks", TaskController.GetTask);
router.post("/api/tasks", TaskController.CreateTask);
router.put("/api/tasks/:id", TaskController.UpdateTask);
router.delete("/api/tasks/:id", TaskController.DeleteTask);

module.exports = router;
