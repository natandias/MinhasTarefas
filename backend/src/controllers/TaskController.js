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
    const { title, description, deadlineDate, deadlineTime } = req.body;
    const { user_id, token } = req.headers;

    console.log("Req body", req.body);

    try {
      return res
        .json({
          controller: "Task",
          method: "CreateTask",
        })
        .status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
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
