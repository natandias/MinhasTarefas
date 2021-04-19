const dbConfig = require("../../knexfile");
const knex = require("knex")(dbConfig.development);

module.exports = async function authorizeUser(req, res, next) {
  const { user_id, token } = req.headers;

  try {
    const user = await knex("users")
      .where({ id: user_id, token: token })
      .first("id");

    if (user !== undefined && user) next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Usuário não autorizado!",
    });
  }
};
