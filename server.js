const express = require("express");
const cors = require("cors");
const actionRouter = require("./routers/actionRouter");
const projectRouter = require("./routers/projectRouter");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/project", projectRouter);
server.use("/action", actionRouter);

server.get("/", (req, res) => {
  res.json("Web Sprint Challenge Web Api - NODE");
});

module.exports = server;
