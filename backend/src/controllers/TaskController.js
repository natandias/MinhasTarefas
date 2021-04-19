const dbConfig = require("../../knexfile");
const knex = require("knex")(dbConfig.development);

module.exports = {
  async GetTasks(req, res) {
    const { user_id } = req.headers;
    const { status } = req.query;

    try {
      const tasks = await knex("tasks")
        .select()
        .where(builder => {
          builder.where("user_id", user_id);
          if (status) builder.where("status", status);
        });

      return res.json(tasks).status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async CreateTask(req, res) {
    const { title, description, deadlineDate, deadlineTime } = req.body;
    const { user_id } = req.headers;

    try {
      const wasTaskCreated = await knex("tasks").insert({
        user_id,
        title,
        description,
        deadlineDate,
        deadlineTime,
        status: "created",
      });

      if (!wasTaskCreated) throw "Houve um erro na criação da tarefa";

      return res.json({ success: true }).status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async UpdateTask(req, res) {
    const { id } = req.params;
    const { title, description, deadlineDate, deadlineTime } = req.body;
    const { user_id } = req.headers;

    try {
      const updated = await knex("tasks")
        .where({ id: id, user_id: user_id })
        .update({ title, description, deadlineDate, deadlineTime });

      if (!updated) throw "Houve um erro na atualização da tarefa";

      return res.json({ success: true }).status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async DeleteTask(req, res) {
    const { id } = req.params;
    const { user_id } = req.headers;

    try {
      const deleted = await knex("tasks")
        .where({ id: id, user_id: user_id })
        .del();

      if (!deleted) throw "Houve um erro ao deletar a tarefa";

      return res.json({ success: true }).status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async UpdateTaskStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { user_id } = req.headers;

    try {
      const updated = await knex("tasks")
        .where({ id: id, user_id: user_id })
        .update({ status });

      if (!updated) throw "Houve um erro na atualização do status da tarefa";

      return res.json({ success: true }).status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
};
