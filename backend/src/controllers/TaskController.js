const dbConfig = require("../../knexfile");
const knex = require("knex")(dbConfig.development);

module.exports = {
  async GetTask(req, res) {
    return res
      .json({
        controller: "Task",
        method: "GetTask",
      })
      .status(200);
  },

  async CreateTask(req, res) {
    try {
      return res
        .json({
          controller: "Task",
          method: "CreateTask",
        })
        .status(200);
    } catch (err) {
      console.log("createTask err", err);
      return res.json(err).status(400);
    }
  },

  async UpdateTask(req, res) {
    return res
      .json({
        controller: "Task",
        method: "UpdateTask",
      })
      .status(200);
  },

  async DeleteTask(req, res) {
    return res
      .json({
        controller: "Task",
        method: "DeleteTask",
      })
      .status(200);
  },
};
