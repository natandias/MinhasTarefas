const dbConfig = require("../../knexfile");
const knex = require("knex")(dbConfig.development);

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async GetUser(req, res) {
    return res
      .json({
        controller: "User",
        method: "GetUser",
        methodImplemented: false,
      })
      .status(200);
  },

  async CreateUser(req, res) {
    try {
      const { username, password } = req.body;

      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const tokenUnencripted = [
        username,
        String(Date.now()),
        String(Math.floor(Math.random() * 5733)),
      ].join("");

      const encryptedToken = await bcrypt.hash(tokenUnencripted, saltRounds);

      const userExist = await knex("users")
        .where("username", username)
        .select("id");

      if (userExist.length > 0) throw "Esse usuário não está disponível!";

      await knex("users").insert({
        username,
        password: encryptedPassword,
        token: encryptedToken,
      });

      const createdUser = await knex("users")
        .first("token")
        .where("username", username);

      return res.status(201).json({
        success: true,
        token: createdUser.token,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async Login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await knex("users")
        .where("username", username)
        .first("id", "username", "password", "token");

      if (user.length > 0) throw "Usuário ou senha incorretos !";

      const doesPasswordMatch = await bcrypt.compare(password, user.password);

      if (!doesPasswordMatch) throw "Usuário ou senha incorretos !";

      const tokenUnencripted = [
        user.username,
        String(Date.now()),
        String(Math.floor(Math.random() * 5733)),
      ].join("");

      const encryptedToken = await bcrypt.hash(tokenUnencripted, saltRounds);

      await knex("users")
        .where("id", user.id)
        .update({ token: encryptedToken });

      const userUpdated = await knex("users")
        .where("id", user.id)
        .first("id", "token");

      return res
        .json({
          success: true,
          userId: userUpdated.id,
          token: userUpdated.token,
        })
        .status(200);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

  async UpdateUser(req, res) {
    return res
      .json({
        controller: "User",
        method: "UpdateUser",
        methodImplemented: false,
      })
      .status(200);
  },

  async DeleteUser(req, res) {
    return res
      .json({
        controller: "User",
        method: "DeleteUser",
        methodImplemented: false,
      })
      .status(200);
  },
};
