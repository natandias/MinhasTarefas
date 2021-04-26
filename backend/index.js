const express = require("express");
const app = express();

const hostname = "127.0.0.1";
const port = 5000;

const cors = require("cors");
const corsConfig = {
  origin: "*"
}

app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routes = require("./src/routes");

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
